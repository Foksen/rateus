package ru.mirea.core.service.auth;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.mirea.core.client.YandexOAuthClient;
import ru.mirea.core.client.YandexProfileClient;
import ru.mirea.core.dto.auth.YandexProfileResponse;
import ru.mirea.core.entity.auth.User;
import ru.mirea.core.entity.auth.UserProvider;
import ru.mirea.core.entity.auth.UserRole;
import ru.mirea.core.exception.InvalidUserProviderException;

@Service
@Slf4j
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final YandexOAuthClient yandexOAuthClient;
    private final YandexProfileClient yandexProfileClient;
    private final String defaultYandexPassword;

    public AuthService(
            AuthenticationManager authenticationManager,
            JwtService jwtService,
            PasswordEncoder passwordEncoder,
            UserService userService,
            YandexOAuthClient yandexOAuthClient,
            YandexProfileClient yandexProfileClient,
            @Value("${yandex.oauth.default-user-password}") String defaultYandexPassword
    ) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.yandexOAuthClient = yandexOAuthClient;
        this.yandexProfileClient = yandexProfileClient;
        this.defaultYandexPassword = defaultYandexPassword;
    }

    public String authenticateWithEmail(String email, String password) {
        String emailLowerCase = email.toLowerCase();
        if (userService.findUserByEmail(emailLowerCase)
                .map(User::getUserProvider)
                .orElse(UserProvider.EMAIL) != UserProvider.EMAIL
        ) {
            throw new InvalidUserProviderException("This email is already used with another provider");
        }
        return createAuthenticationToken(emailLowerCase, password);
    }

    public String authenticateWithYandex(String code) {
        String accessToken = yandexOAuthClient.authorizeWithCode(code).accessToken();
        YandexProfileResponse yandexProfile = yandexProfileClient.getProfile(accessToken);

        User yandexUser = userService.findUserByEmail(yandexProfile.defaultEmail().toLowerCase()).orElse(null);
        if (yandexUser == null) {
            return registerWithYandex(
                    yandexProfile.firstName(),
                    yandexProfile.lastName(),
                    yandexProfile.defaultEmail().toLowerCase(),
                    buildYandexAvatarUrl(yandexProfile.defaultAvatarId())
            );
        }
        if (yandexUser.getUserProvider() != UserProvider.YANDEX) {
            throw new InvalidUserProviderException("This email is already used with another provider");
        }
        return createAuthenticationToken(yandexUser.getEmail().toLowerCase(), defaultYandexPassword);
    }

    public String registerWithEmail(String name, String surname, String email, String password) {
        String emailLowerCase = email.toLowerCase();
        String encodedPassword = passwordEncoder.encode(password);
        User user = User.builder()
                .email(emailLowerCase)
                .password(encodedPassword)
                .name(name)
                .surname(surname)
                .avatarUrl("")
                .userRole(UserRole.USER)
                .userProvider(UserProvider.EMAIL)
                .build();
        userService.saveUser(user);
        return createAuthenticationToken(emailLowerCase, password);
    }

    private String createAuthenticationToken(String email, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );
        return jwtService.generateToken(authentication);
    }

    private String registerWithYandex(String name, String surname, String email, String avatarUrl) {
        String encodedPassword = passwordEncoder.encode(defaultYandexPassword);
        User user = User.builder()
                .email(email)
                .password(encodedPassword)
                .name(name)
                .surname(surname)
                .avatarUrl(avatarUrl)
                .userRole(UserRole.USER)
                .userProvider(UserProvider.YANDEX)
                .build();
        userService.saveUser(user);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, defaultYandexPassword)
        );
        return jwtService.generateToken(authentication);
    }

    private String buildYandexAvatarUrl(String defaultAvatarId) {
        return "https://avatars.yandex.net/get-yapic/" + defaultAvatarId + "/islands-retina-small";
    }
}

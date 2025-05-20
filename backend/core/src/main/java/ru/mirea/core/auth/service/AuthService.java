package ru.mirea.core.auth.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.mirea.core.auth.dto.YandexProfileResponse;
import ru.mirea.core.auth.entity.User;
import ru.mirea.core.auth.entity.UserProvider;
import ru.mirea.core.auth.entity.UserRole;
import ru.mirea.core.exception.InvalidUserProviderException;

@Service
@Slf4j
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @Autowired
    private YandexOAuthService yandexOAuthService;

    private final String DEFAULT_YANDEX_PASSWORD = "YANDEX-PASSWORD";

    public String authenticateWithEmail(String email, String password) {
        if (userService.findUserByEmail(email)
                .map(User::getUserProvider)
                .orElse(UserProvider.EMAIL) != UserProvider.EMAIL
        ) {
            throw new InvalidUserProviderException("This email is already used with another provider");
        }
        return createAuthenticationToken(email, password);
    }

    public String authenticateWithYandex(String code) {
        String accessToken = yandexOAuthService.authorizeWithCode(code).accessToken();
        YandexProfileResponse yandexProfile = yandexOAuthService.getYandexProfile(accessToken);

        User yandexUser = userService.findUserByEmail(yandexProfile.defaultEmail()).orElse(null);
        if (yandexUser == null) {
            return registerWithYandex(
                    yandexProfile.firstName(),
                    yandexProfile.lastName(),
                    yandexProfile.defaultEmail(),
                    yandexOAuthService.getAvatarUrl(yandexProfile.defaultAvatarId())
            );
        }
        if (yandexUser.getUserProvider() != UserProvider.YANDEX) {
            throw new InvalidUserProviderException("This email is already used with another provider");
        }
        return createAuthenticationToken(yandexUser.getEmail(), DEFAULT_YANDEX_PASSWORD);
    }

    public String registerWithEmail(String name, String surname, String email, String password) {
        String encodedPassword = passwordEncoder.encode(password);
        User user = User.builder()
                .email(email)
                .password(encodedPassword)
                .name(name)
                .surname(surname)
                .avatarUrl("")
                .userRole(UserRole.USER)
                .userProvider(UserProvider.EMAIL)
                .build();
        userService.saveUser(user);
        return createAuthenticationToken(email, password);
    }

    private String createAuthenticationToken(String email, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );
        return jwtService.generateToken(authentication);
    }

    private String registerWithYandex(String name, String surname, String email, String avatarUrl) {
        String encodedPassword = passwordEncoder.encode(DEFAULT_YANDEX_PASSWORD);
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
                new UsernamePasswordAuthenticationToken(email, DEFAULT_YANDEX_PASSWORD)
        );
        return jwtService.generateToken(authentication);
    }
}

package ru.mirea.core.controller.auth;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.mirea.core.dto.auth.SignInEmailRequest;
import ru.mirea.core.dto.auth.SignInYandexRequest;
import ru.mirea.core.dto.auth.SignUpEmailRequest;
import ru.mirea.core.dto.auth.TokenResponse;
import ru.mirea.core.service.auth.AuthService;

@Tag(name = "Auth", description = "Регистрация и авторизация")
@RestController
@RequestMapping("/back-auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/sign-in/email")
    public TokenResponse signInWithEmail(@RequestBody SignInEmailRequest request) {
        String token = authService.authenticateWithEmail(
                request.email(),
                request.password()
        );
        return new TokenResponse(token);
    }

    @PostMapping("/sign-in/yandex")
    public TokenResponse signInWithYandex(@RequestBody SignInYandexRequest request) {
        String token = authService.authenticateWithYandex(request.code());
        return new TokenResponse(token);
    }

    @PostMapping("/sign-up/email")
    public TokenResponse signUpWithEmail(@RequestBody SignUpEmailRequest request) {
        String token = authService.registerWithEmail(
                request.name(),
                request.surname(),
                request.email(),
                request.password()
        );
        return new TokenResponse(token);
    }
}

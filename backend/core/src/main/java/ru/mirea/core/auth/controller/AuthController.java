package ru.mirea.core.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.mirea.core.auth.dto.SignInEmailRequest;
import ru.mirea.core.auth.dto.SignInYandexRequest;
import ru.mirea.core.auth.dto.TokenResponse;
import ru.mirea.core.auth.dto.SignUpEmailRequest;
import ru.mirea.core.auth.service.AuthService;

@RestController
@RequestMapping("/api/auth")
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

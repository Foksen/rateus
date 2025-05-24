package ru.mirea.core.dto.auth;

public record SignInEmailRequest(
        String email,
        String password
) { }

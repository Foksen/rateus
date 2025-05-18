package ru.mirea.core.auth.dto;

public record SignInEmailRequest(
        String email,
        String password
) { }

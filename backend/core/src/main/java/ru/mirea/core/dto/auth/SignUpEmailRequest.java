package ru.mirea.core.dto.auth;

public record SignUpEmailRequest(
        String name,
        String surname,
        String email,
        String password
) { }

package ru.mirea.core.auth.dto;

public record SignUpEmailRequest(
        String name,
        String surname,
        String email,
        String password
) { }

package ru.mirea.core.dto.auth;

import jakarta.validation.constraints.*;

public record SignUpEmailRequest(
        @Size(max = 32, message = "Максимальная длина имени - 32 символа")
        @Pattern(regexp = "^[a-zA-Zа-яА-ЯёЁ .-]+$", message = "Имя содержит недопустимые символы")
        String name,

        @Size(max = 32, message = "Максимальная длина фамилии - 32 символа")
        @Pattern(regexp = "^[a-zA-Zа-яА-ЯёЁ .-]+$", message = "Фамилия содержит недопустимые символы")
        String surname,

        @Email(message = "Некорректная почта")
        String email,

        @Size(min = 8, max = 32, message = "Допустимая длина пароля - от 8 до 32 символов")
        String password
) { }

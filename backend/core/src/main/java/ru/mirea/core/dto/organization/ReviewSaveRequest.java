package ru.mirea.core.dto.organization;

import jakarta.validation.constraints.Size;

import java.util.UUID;

public record ReviewSaveRequest(
        UUID organizationId,

        Integer rating,

        // @Size(min = 16, max = 256, message = "Допустимая длина отзыва - от 16 до 256 символов")
        String comment
) { }

package ru.mirea.core.dto.organization;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;

public record OrganizationSaveRequest(
        @Size(min = 16, max = 256, message = "Допустимая длина названия - от 16 до 256 символов")
        String name,

        Integer organizationTypeId,

        @Size(min = 30, max = 2000, message = "Допустимая длина описания - от 30 до 2000 символов")
        String description,

        @Nullable String websiteUrl,

        @URL(message = "Некорректная ссылка на изображение")
        String photoUrl
) { }

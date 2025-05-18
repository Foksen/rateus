package ru.mirea.core.auth.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record YandexProfileResponse(
        String id,
        String login,
        String defaultEmail,
        boolean isAvatarEmpty,
        String defaultAvatarId,
        String birthday,
        String firstName,
        String lastName,
        String sex
) { }

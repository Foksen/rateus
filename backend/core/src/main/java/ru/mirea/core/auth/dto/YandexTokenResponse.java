package ru.mirea.core.auth.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record YandexTokenResponse(
        String accessToken,
        String tokenType,
        int expiresIn,
        String refreshToken,
        String error,
        String errorDescription
) { }

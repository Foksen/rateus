package ru.mirea.core.dto.auth;

import ru.mirea.core.entity.auth.UserProvider;
import ru.mirea.core.entity.auth.UserRole;

import java.time.Instant;
import java.util.UUID;

public record UserResponse(
        UUID id,
        String email,
        UserProvider userProvider,
        UserRole userRole,
        Boolean isBlocked,
        String name,
        String surname,
        String avatarUrl,
        Instant createdAt,
        Instant updatedAt
) { }

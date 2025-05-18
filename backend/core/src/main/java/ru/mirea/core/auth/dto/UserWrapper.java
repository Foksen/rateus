package ru.mirea.core.auth.dto;

import ru.mirea.core.auth.entity.UserProvider;
import ru.mirea.core.auth.entity.UserRole;

import java.time.Instant;
import java.util.UUID;

public record UserWrapper(
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

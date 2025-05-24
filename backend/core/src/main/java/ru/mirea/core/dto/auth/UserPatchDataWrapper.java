package ru.mirea.core.dto.auth;

import jakarta.annotation.Nullable;
import ru.mirea.core.entity.auth.UserRole;

public record UserPatchDataWrapper(
        @Nullable String email,
        @Nullable String password,
        @Nullable UserRole userRole,
        @Nullable Boolean isBlocked,
        @Nullable String name,
        @Nullable String surname,
        @Nullable String avatarUrl
){ }

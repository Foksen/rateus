package ru.mirea.core.model;

import jakarta.annotation.Nullable;
import ru.mirea.core.entity.auth.UserRole;

public record UserPatchData(
        @Nullable String email,
        @Nullable String password,
        @Nullable UserRole userRole,
        @Nullable Boolean isBlocked,
        @Nullable String name,
        @Nullable String surname,
        @Nullable String avatarUrl
) { }

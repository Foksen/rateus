package ru.mirea.core.dto.organization;

import jakarta.annotation.Nullable;

public record OrganizationSaveRequest(
        String name,
        Integer organizationTypeId,
        String description,
        @Nullable String websiteUrl,
        String photoUrl
) { }

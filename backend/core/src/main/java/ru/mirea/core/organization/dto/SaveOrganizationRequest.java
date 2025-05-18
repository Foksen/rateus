package ru.mirea.core.organization.dto;

import jakarta.annotation.Nullable;

public record SaveOrganizationRequest(
        String name,
        Integer organizationTypeId,
        String description,
        @Nullable String websiteUrl,
        String photoUrl
) { }

package ru.mirea.core.organization.dto;

import java.time.Instant;
import java.util.UUID;

public record OrganizationWrapper (
    UUID id,
    UUID ownerId,
    String name,
    Integer organizationTypeId,
    String organizationType,
    String description,
    String websiteUrl,
    String photoUrl,
    Boolean onceModerated,
    Double avgRating,
    Instant createdAt,
    Instant updatedAt
) { }

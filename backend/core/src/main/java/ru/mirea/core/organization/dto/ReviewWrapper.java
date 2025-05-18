package ru.mirea.core.organization.dto;

import java.time.Instant;
import java.util.UUID;

public record ReviewWrapper(
    UUID id,
    UUID authorId,
    UUID organizationId,
    Integer rating,
    String comment,
    Boolean onceModerated,
    Instant createdAt,
    Instant updatedAt
) { }

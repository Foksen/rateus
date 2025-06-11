package ru.mirea.core.dto.organization;

import java.time.Instant;
import java.util.UUID;

public record ReviewResponse(
    UUID id,
    UUID authorId,
    String authorNameSurname,
    String authorAvatarUrl,
    UUID organizationId,
    Integer rating,
    String comment,
    Boolean onceModerated,
    Instant createdAt,
    Instant updatedAt
) { }

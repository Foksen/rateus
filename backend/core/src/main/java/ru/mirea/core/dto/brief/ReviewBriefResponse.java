package ru.mirea.core.dto.brief;

import ru.mirea.core.entity.brief.BriefStatus;

import java.time.Instant;
import java.util.UUID;

public record ReviewBriefResponse(
        UUID id,
        UUID authorId,
        String authorNameSurname,
        String authorAvatarUrl,
        UUID reviewId,
        UUID organizationId,
        Boolean isNew,
        Integer rating,
        String comment,
        BriefStatus status,
        Instant createdAt,
        Instant updatedAt
) { }

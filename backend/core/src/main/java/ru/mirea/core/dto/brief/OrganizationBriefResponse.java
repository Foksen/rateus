package ru.mirea.core.dto.brief;

import jakarta.annotation.Nullable;
import ru.mirea.core.entity.brief.BriefStatus;

import java.time.Instant;
import java.util.UUID;

public record OrganizationBriefResponse(
        UUID id,
        UUID ownerId,
        UUID organizationId,
        Boolean isNew,
        String name,
        Integer organizationTypeId,
        String description,
        @Nullable String websiteUrl,
        String photoUrl,
        BriefStatus status,
        Instant createdAt,
        Instant updatedAt
) { }

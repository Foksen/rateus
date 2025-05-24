package ru.mirea.core.dto.organization;

import java.util.UUID;

public record SaveReviewRequest(
        UUID organizationId,
        Integer rating,
        String comment
) { }

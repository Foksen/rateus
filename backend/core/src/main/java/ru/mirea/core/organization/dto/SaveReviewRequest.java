package ru.mirea.core.organization.dto;

import java.util.UUID;

public record SaveReviewRequest(
        UUID organizationId,
        Integer rating,
        String comment
) { }

package ru.mirea.core.dto.organization;

import java.util.UUID;

public record ReviewSaveRequest(
        UUID organizationId,
        Integer rating,
        String comment
) { }

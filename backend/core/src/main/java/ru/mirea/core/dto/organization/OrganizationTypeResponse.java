package ru.mirea.core.dto.organization;

public record OrganizationTypeResponse(
        Integer id,
        String name,
        Boolean isAvailable
) { }

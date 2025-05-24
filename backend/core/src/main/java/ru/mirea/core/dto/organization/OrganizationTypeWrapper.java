package ru.mirea.core.dto.organization;

public record OrganizationTypeWrapper(
        Integer id,
        String name,
        Boolean isAvailable
) { }

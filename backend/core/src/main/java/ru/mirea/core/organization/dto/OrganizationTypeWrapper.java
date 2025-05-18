package ru.mirea.core.organization.dto;

public record OrganizationTypeWrapper(
        Integer id,
        String name,
        Boolean isAvailable
) { }

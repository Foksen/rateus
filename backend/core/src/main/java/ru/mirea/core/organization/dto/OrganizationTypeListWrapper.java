package ru.mirea.core.organization.dto;

import java.util.List;

public record OrganizationTypeListWrapper(
        List<OrganizationTypeWrapper> organizationTypes
) { }

package ru.mirea.core.dto.organization;

import java.util.List;

public record OrganizationTypeListWrapper(
        List<OrganizationTypeWrapper> organizationTypes
) { }

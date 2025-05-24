package ru.mirea.core.dto.organization;

import java.util.List;

public record OrganizationListWrapper(
    List<OrganizationWrapper> organizations
) { }

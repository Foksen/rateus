package ru.mirea.core.organization.dto;

import java.util.List;

public record OrganizationListWrapper(
    List<OrganizationWrapper> organizations
) { }

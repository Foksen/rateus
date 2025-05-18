package ru.mirea.core.organization.dto;

import java.util.List;

public record ReviewListWrapper(
        List<ReviewWrapper> reviews
) { }

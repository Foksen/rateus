package ru.mirea.core.dto.organization;

import java.util.List;

public record ReviewListWrapper(
        List<ReviewWrapper> reviews
) { }

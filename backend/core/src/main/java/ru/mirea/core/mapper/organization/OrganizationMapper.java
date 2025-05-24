package ru.mirea.core.mapper.organization;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValueCheckStrategy;
import ru.mirea.core.dto.organization.OrganizationListWrapper;
import ru.mirea.core.dto.organization.OrganizationWrapper;
import ru.mirea.core.entity.organization.Organization;
import ru.mirea.core.entity.organization.Review;

import java.util.List;
import java.util.Objects;
import java.util.OptionalDouble;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface OrganizationMapper {

    @Mapping(source = "owner.id", target = "ownerId")
    @Mapping(source = "organizationType.id", target = "organizationTypeId")
    @Mapping(source = "organizationType.name", target = "organizationType")
    @Mapping(target = "avgRating", expression = "java(calcAvgRating(organization.getReviews()))")
    OrganizationWrapper map(Organization organization);

    default OrganizationListWrapper map(List<Organization> organizations) {
        return new OrganizationListWrapper(organizations.stream().map(this::map).toList());
    }

    default Double calcAvgRating(List<Review> reviews) {
        if (reviews == null || reviews.isEmpty()) return null;
        OptionalDouble avg = reviews.stream()
                .filter(Review::getOnceModerated)
                .map(Review::getRating)
                .filter(Objects::nonNull)
                .mapToInt(Integer::intValue)
                .average();
        return avg.isPresent() ? avg.getAsDouble() : null;
    }
}

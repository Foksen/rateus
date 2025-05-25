package ru.mirea.core.mapper.brief;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValueCheckStrategy;
import ru.mirea.core.dto.brief.OrganizationBriefResponse;
import ru.mirea.core.dto.brief.ReviewBriefResponse;
import ru.mirea.core.entity.brief.OrganizationBrief;
import ru.mirea.core.entity.brief.ReviewBrief;

import java.util.List;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface BriefMapper {

    @Mapping(source = "owner.id", target = "ownerId")
    @Mapping(source = "organization.id", target = "organizationId")
    @Mapping(source = "organizationType.id", target = "organizationTypeId")
    OrganizationBriefResponse mapOrganizationBrief(OrganizationBrief organizationBrief);

    @Mapping(source = "author.id", target = "authorId")
    @Mapping(source = "review.id", target = "reviewId")
    @Mapping(source = "organization.id", target = "organizationId")
    ReviewBriefResponse mapReviewBrief(ReviewBrief reviewBrief);

    default List<OrganizationBriefResponse> mapOrganizationBriefs(List<OrganizationBrief> organizationBriefs) {
        return organizationBriefs.stream().map(this::mapOrganizationBrief).toList();
    }

    default List<ReviewBriefResponse> mapReviewBriefs(List<ReviewBrief> reviewBriefs) {
        return reviewBriefs.stream().map(this::mapReviewBrief).toList();
    }
}

package ru.mirea.core.mapper.organization;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValueCheckStrategy;
import ru.mirea.core.dto.organization.ReviewListWrapper;
import ru.mirea.core.dto.organization.ReviewWrapper;
import ru.mirea.core.entity.organization.Review;

import java.util.List;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface ReviewMapper {

    @Mapping(source = "author.id", target = "authorId")
    @Mapping(source = "organization.id", target = "organizationId")
    ReviewWrapper map(Review review);

    default ReviewListWrapper map(List<Review> reviews) {
        return new ReviewListWrapper(reviews.stream().map(this::map).toList());
    }
}

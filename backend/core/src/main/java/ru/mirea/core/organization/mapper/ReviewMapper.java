package ru.mirea.core.organization.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValueCheckStrategy;
import ru.mirea.core.organization.dto.ReviewListWrapper;
import ru.mirea.core.organization.dto.ReviewWrapper;
import ru.mirea.core.organization.entity.Review;

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

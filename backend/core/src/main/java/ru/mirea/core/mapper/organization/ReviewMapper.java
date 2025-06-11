package ru.mirea.core.mapper.organization;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValueCheckStrategy;
import ru.mirea.core.dto.organization.ReviewResponse;
import ru.mirea.core.entity.auth.User;
import ru.mirea.core.entity.organization.Review;

import java.util.List;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface ReviewMapper {

    @Mapping(source = "author.id", target = "authorId")
    @Mapping(source = "author.avatarUrl", target = "authorAvatarUrl")
    @Mapping(target = "authorNameSurname", expression = "java(getAuthorNameSurname(review.getAuthor()))")
    @Mapping(source = "organization.id", target = "organizationId")
    ReviewResponse map(Review review);

    default List<ReviewResponse> map(List<Review> reviews) {
        return reviews.stream().map(this::map).toList();
    }

    default String getAuthorNameSurname(User author) {
        if (author == null) return null;
        String name = author.getName() != null ? author.getName() : "";
        String surname = author.getSurname() != null ? author.getSurname() : "";
        return (name + " " + surname).trim();
    }
}

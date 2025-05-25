package ru.mirea.core.service.organization;

import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.mirea.core.entity.auth.User;
import ru.mirea.core.entity.brief.ReviewBrief;
import ru.mirea.core.entity.organization.Organization;
import ru.mirea.core.entity.organization.Review;
import ru.mirea.core.exception.UserNotFoundException;
import ru.mirea.core.repository.organization.ReviewRepository;
import ru.mirea.core.service.auth.UserService;
import ru.mirea.core.service.brief.BriefService;

import java.util.UUID;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserService userService;
    private final BriefService briefService;

    public ReviewService(ReviewRepository reviewRepository, UserService userService, BriefService briefService) {
        this.reviewRepository = reviewRepository;
        this.userService = userService;
        this.briefService = briefService;
    }

    @Transactional
    public ReviewBrief createReview(
            UserDetails userDetails,
            UUID organizationId,
            Integer rating,
            String comment
    ) {
        User owner = userService.findUserByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User not found with email " + userDetails.getUsername()));

        Review review = Review.builder()
                .author(User.builder().id(owner.getId()).build())
                .organization(Organization.builder().id(organizationId).build())
                .rating(rating)
                .comment(comment)
                .onceModerated(false)
                .build();

        Review savedReview = reviewRepository.save(review);

        return briefService.createReviewBrief(savedReview, true);
    }

    @Transactional
    public ReviewBrief updateReview(
            UserDetails userDetails,
            UUID id,
            UUID organizationId,
            Integer rating,
            String comment
    ) {
        User author = userService.findUserByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User not found with email " + userDetails.getUsername()));

        Review oldReview = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found with id " + id));

        if (!oldReview.getAuthor().getEmail().equals(userDetails.getUsername())) {
            throw new AuthorizationDeniedException("User " + userDetails.getUsername() +
                    " has no access for review " + id);
        }

        Review updatedReview = Review.builder()
                .id(id)
                .author(User.builder().id(author.getId()).build())
                .organization(Organization.builder().id(organizationId).build())
                .rating(rating)
                .comment(comment)
                .build();

        return briefService.createReviewBrief(updatedReview, false);
    }
}

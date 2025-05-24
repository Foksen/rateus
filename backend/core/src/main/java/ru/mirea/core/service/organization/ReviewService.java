package ru.mirea.core.service.organization;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import ru.mirea.core.entity.auth.User;
import ru.mirea.core.entity.organization.Organization;
import ru.mirea.core.entity.organization.Review;
import ru.mirea.core.exception.UserNotFoundException;
import ru.mirea.core.repository.organization.ReviewRepository;
import ru.mirea.core.service.auth.UserService;

import java.util.UUID;

@Service
public class ReviewService {

    private static final Logger log = LoggerFactory.getLogger(ReviewService.class);
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserService userService;

    public Review createReview(
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
                .build();

        log.info("REVIEW: {}", review);

        // TODO: Brief logic

        return reviewRepository.save(review);
    }

}

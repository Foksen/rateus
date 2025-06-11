package ru.mirea.core.controller.organization;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ru.mirea.core.dto.brief.ReviewBriefResponse;
import ru.mirea.core.dto.organization.ReviewResponse;
import ru.mirea.core.dto.organization.ReviewSaveRequest;
import ru.mirea.core.entity.brief.ReviewBrief;
import ru.mirea.core.entity.organization.Review;
import ru.mirea.core.mapper.brief.BriefMapper;
import ru.mirea.core.mapper.organization.ReviewMapper;
import ru.mirea.core.service.organization.ReviewService;

import java.util.List;
import java.util.UUID;

@Tag(name = "Reviews", description = "Операции с отзывами")
@RestController
@RequestMapping("/reviews")
public class ReviewController {

    private final ReviewService reviewService;
    private final ReviewMapper reviewMapper;
    private final BriefMapper briefMapper;

    public ReviewController(ReviewService reviewService, ReviewMapper reviewMapper, BriefMapper briefMapper) {
        this.reviewService = reviewService;
        this.reviewMapper = reviewMapper;
        this.briefMapper = briefMapper;
    }

    @SecurityRequirement(name = "BearerAuth")
    @PostMapping
    public ReviewBriefResponse createReview(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody ReviewSaveRequest request
    ) {
        ReviewBrief reviewBrief = reviewService.createReview(
                userDetails,
                request.organizationId(),
                request.rating(),
                request.comment()
        );
        return briefMapper.mapReviewBrief(reviewBrief);
    }

    @SecurityRequirement(name = "BearerAuth")
    @PutMapping("/{reviewId}")
    public ReviewBriefResponse updateReview(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable("reviewId") UUID reviewId,
            @RequestBody ReviewSaveRequest request
    ) {
        ReviewBrief reviewBrief = reviewService.createReview(
                userDetails,
                request.organizationId(),
                request.rating(),
                request.comment()
        );
        return briefMapper.mapReviewBrief(reviewBrief);
    }

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/self")
    public List<ReviewResponse> getSelfReviews(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        List<Review> reviews = reviewService.getSelfReviews(userDetails);
        return reviewMapper.map(reviews);
    }

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/self/{reviewId}")
    public ReviewResponse getSelfReview(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable("reviewId") UUID reviewId
    ) {
        Review review = reviewService.getSelfReview(userDetails, reviewId);
        return reviewMapper.map(review);
    }

    @GetMapping("/public")
    public List<ReviewResponse> getPublicReviews(
            @RequestParam UUID organizationId
    ) {
        List<Review> reviews = reviewService.getPublicReviews(organizationId);
        return reviewMapper.map(reviews);
    }

    @GetMapping("/public/{reviewId}")
    public ReviewResponse getPublicReview(
            @PathVariable("reviewId") UUID reviewId
    ) {
        Review review = reviewService.getPublicReview(reviewId);
        return reviewMapper.map(review);
    }
}

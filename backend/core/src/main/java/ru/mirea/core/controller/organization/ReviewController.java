package ru.mirea.core.controller.organization;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.mirea.core.dto.brief.ReviewBriefResponse;
import ru.mirea.core.dto.organization.ReviewSaveRequest;
import ru.mirea.core.entity.brief.ReviewBrief;
import ru.mirea.core.mapper.brief.BriefMapper;
import ru.mirea.core.service.organization.ReviewService;

@Tag(name = "Reviews", description = "Операции с отзывами")
@RestController
@RequestMapping("/reviews")
public class ReviewController {

    private final ReviewService reviewService;
    private final BriefMapper briefMapper;

    public ReviewController(ReviewService reviewService, BriefMapper briefMapper) {
        this.reviewService = reviewService;
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
}

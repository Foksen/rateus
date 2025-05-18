package ru.mirea.core.organization.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.mirea.core.organization.dto.ReviewWrapper;
import ru.mirea.core.organization.dto.SaveReviewRequest;
import ru.mirea.core.organization.entity.Review;
import ru.mirea.core.organization.mapper.ReviewMapper;
import ru.mirea.core.organization.service.ReviewService;

@RestController
@RequestMapping("/api/organizations/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private ReviewMapper reviewMapper;

    @PostMapping
    public ReviewWrapper createReview(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody SaveReviewRequest request
    ) {
        Review review = reviewService.createReview(userDetails, request.organizationId(), request.rating(), request.comment());
        return reviewMapper.map(review);
    }

}

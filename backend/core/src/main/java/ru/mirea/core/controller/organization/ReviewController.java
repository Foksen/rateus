package ru.mirea.core.controller.organization;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.mirea.core.dto.organization.ReviewResponse;
import ru.mirea.core.dto.organization.ReviewSaveRequest;
import ru.mirea.core.entity.organization.Review;
import ru.mirea.core.mapper.organization.ReviewMapper;
import ru.mirea.core.service.organization.ReviewService;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private ReviewMapper reviewMapper;

    @PostMapping
    public ReviewResponse createReview(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody ReviewSaveRequest request
    ) {
        Review review = reviewService.createReview(userDetails, request.organizationId(), request.rating(), request.comment());
        return reviewMapper.map(review);
    }

}

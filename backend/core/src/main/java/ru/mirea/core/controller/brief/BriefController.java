package ru.mirea.core.controller.brief;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ru.mirea.core.dto.brief.OrganizationBriefResponse;
import ru.mirea.core.dto.brief.ReviewBriefResponse;
import ru.mirea.core.dto.organization.OrganizationResponse;
import ru.mirea.core.dto.organization.ReviewResponse;
import ru.mirea.core.entity.brief.BriefStatus;
import ru.mirea.core.entity.brief.OrganizationBrief;
import ru.mirea.core.entity.brief.ReviewBrief;
import ru.mirea.core.entity.organization.Organization;
import ru.mirea.core.entity.organization.Review;
import ru.mirea.core.mapper.brief.BriefMapper;
import ru.mirea.core.mapper.organization.OrganizationMapper;
import ru.mirea.core.mapper.organization.ReviewMapper;
import ru.mirea.core.service.brief.BriefService;

import java.util.List;
import java.util.UUID;

@Tag(name = "Briefs", description = "Операции с заявками")
@RestController
@RequestMapping("/briefs")
public class BriefController {

    private final BriefService briefService;
    private final BriefMapper briefMapper;
    private final OrganizationMapper organizationMapper;
    private final ReviewMapper reviewMapper;

    public BriefController(BriefService briefService, BriefMapper briefMapper, OrganizationMapper organizationMapper, ReviewMapper reviewMapper) {
        this.briefService = briefService;
        this.briefMapper = briefMapper;
        this.organizationMapper = organizationMapper;
        this.reviewMapper = reviewMapper;
    }

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/organizations")
    public List<OrganizationBriefResponse> getOrganizationBriefs() {
        List<OrganizationBrief> organizationBriefs = briefService.getOrganizationBriefs();
        return briefMapper.mapOrganizationBriefs(organizationBriefs);
    }

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/organizations/{briefId}")
    public OrganizationBriefResponse getOrganizationBrief(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable(name = "briefId") UUID briefId
    ) {
        OrganizationBrief organizationBrief = briefService.getOrganizationBrief(userDetails, briefId);
        return briefMapper.mapOrganizationBrief(organizationBrief);
    }

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/organizations/self")
    public List<OrganizationBriefResponse> getSelfOrganizationBriefs(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        List<OrganizationBrief> organizationBriefs = briefService.getSelfOrganizationBriefs(userDetails);
        return briefMapper.mapOrganizationBriefs(organizationBriefs);
    }

    @SecurityRequirement(name = "BearerAuth")
    @PatchMapping("/organizations/{briefId}/{status}")
    public OrganizationResponse updateOrganizationBriefStatus(
            @PathVariable(name = "briefId") UUID briefId,
            @PathVariable(name = "status") AllowedPatchBriefStatus status
    ) {
        Organization organization = briefService.updateOrganizationBriefStatus(briefId, status.toBriefStatus());
        return organizationMapper.map(organization);
    }

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/reviews/{briefId}")
    public ReviewBriefResponse getReviewBrief(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable(name = "briefId") UUID briefId
    ) {
        ReviewBrief reviewBrief = briefService.getReviewBrief(userDetails, briefId);
        return briefMapper.mapReviewBrief(reviewBrief);
    }

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/reviews/self")
    public List<ReviewBriefResponse> getSelfReviewBriefs(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        List<ReviewBrief> reviewBriefs = briefService.getSelfReviewBriefs(userDetails);
        return briefMapper.mapReviewBriefs(reviewBriefs);
    }

    @SecurityRequirement(name = "BearerAuth")
    @PatchMapping("/reviews/{briefId}/{status}")
    public ReviewResponse updateReviewBriefStatus(
            @PathVariable(name = "briefId") UUID briefId,
            @PathVariable(name = "status") AllowedPatchBriefStatus status
    ) {
        Review review = briefService.updateReviewBriefStatus(briefId, status.toBriefStatus());
        return reviewMapper.map(review);
    }

    public enum AllowedPatchBriefStatus {
        approved,
        rejected;

        public BriefStatus toBriefStatus() {
            return switch (this) {
                case approved -> BriefStatus.APPROVED;
                case rejected -> BriefStatus.REJECTED;
            };
        }
    }
}

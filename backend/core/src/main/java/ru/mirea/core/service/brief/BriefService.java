package ru.mirea.core.service.brief;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.mirea.core.entity.brief.BriefStatus;
import ru.mirea.core.entity.brief.OrganizationBrief;
import ru.mirea.core.entity.brief.ReviewBrief;
import ru.mirea.core.entity.organization.Organization;
import ru.mirea.core.entity.organization.Review;
import ru.mirea.core.repository.brief.OrganizationBriefRepository;
import ru.mirea.core.repository.brief.ReviewBriefRepository;

import java.util.List;
import java.util.UUID;

import static ru.mirea.core.util.UserUtil.isModeratorOrAdmin;

@Service
public class BriefService {

    private final OrganizationBriefRepository organizationBriefRepository;
    private final ReviewBriefRepository reviewBriefRepository;

    public BriefService(
            OrganizationBriefRepository organizationBriefRepository,
            ReviewBriefRepository reviewBriefRepository
    ) {
        this.organizationBriefRepository = organizationBriefRepository;
        this.reviewBriefRepository = reviewBriefRepository;
    }

    @Transactional
    public OrganizationBrief createOrganizationBrief(Organization organization, boolean isNew) {
        OrganizationBrief organizationBrief = OrganizationBrief.builder()
                .owner(organization.getOwner())
                .organization(organization)
                .isNew(isNew)
                .name(organization.getName())
                .organizationType(organization.getOrganizationType())
                .description(organization.getDescription())
                .websiteUrl(organization.getWebsiteUrl())
                .photoUrl(organization.getPhotoUrl())
                .status(BriefStatus.NEW)
                .build();

        return organizationBriefRepository.save(organizationBrief);
    }

    @Transactional
    public Organization updateOrganizationBriefStatus(UUID briefId, BriefStatus newStatus) {
        if (newStatus == BriefStatus.NEW) {
            throw new IllegalArgumentException("Cannot set status " + BriefStatus.NEW + " for organization brief");
        }

        OrganizationBrief organizationBrief = organizationBriefRepository.findById(briefId)
                .orElseThrow(() -> new RuntimeException("Organization brief not found with id " + briefId));

        if (organizationBrief.getStatus() != BriefStatus.NEW) {
            throw new RuntimeException("Organization brief " + briefId + " was already moderated");
        }

        Organization organization = organizationBrief.getOrganization();

        organizationBrief.setStatus(newStatus);

        if (newStatus == BriefStatus.REJECTED) {
            return organization;
        }

        organization.setName(organizationBrief.getName());
        organization.setOrganizationType(organizationBrief.getOrganizationType());
        organization.setDescription(organizationBrief.getDescription());
        organization.setWebsiteUrl(organizationBrief.getWebsiteUrl());
        organization.setPhotoUrl(organizationBrief.getPhotoUrl());

        if (organizationBrief.getIsNew()) {
            organization.setOnceModerated(true);
        }

        return organization;
    }

    public List<OrganizationBrief> getOrganizationBriefs() {
        return organizationBriefRepository.findAll();
    }

    public OrganizationBrief getOrganizationBrief(UserDetails userDetails, UUID briefId) {
        OrganizationBrief organizationBrief = organizationBriefRepository.findById(briefId)
                .orElseThrow(() -> new RuntimeException("Organization brief not found with id " + briefId));

        if (!(organizationBrief.getOwner().getEmail().equals(userDetails.getUsername())
                        || isModeratorOrAdmin(userDetails))) {
            throw new AccessDeniedException("User " + userDetails.getUsername() +
                    " has no access for organization brief " + briefId);
        }

        return organizationBrief;
    }

    public List<OrganizationBrief> getSelfOrganizationBriefs(UserDetails userDetails) {
        return organizationBriefRepository.findByOwnerEmail(userDetails.getUsername());
    }

    @Transactional
    public ReviewBrief createReviewBrief(Review review, boolean isNew) {
        ReviewBrief reviewBrief = ReviewBrief.builder()
                .author(review.getAuthor())
                .review(review)
                .organization(review.getOrganization())
                .isNew(isNew)
                .rating(review.getRating())
                .comment(review.getComment())
                .status(BriefStatus.NEW)
                .build();

        return reviewBriefRepository.save(reviewBrief);
    }

    @Transactional
    public Review updateReviewBriefStatus(UUID briefId, BriefStatus newStatus) {
        if (newStatus == BriefStatus.NEW) {
            throw new IllegalArgumentException("Cannot set status " + BriefStatus.NEW + " for review brief");
        }

        ReviewBrief reviewBrief = reviewBriefRepository.findById(briefId)
                .orElseThrow(() -> new RuntimeException("Review brief not found with id " + briefId));

        if (reviewBrief.getStatus() != BriefStatus.NEW) {
            throw new RuntimeException("Review brief " + briefId + " was already moderated");
        }

        Review review = reviewBrief.getReview();

        reviewBrief.setStatus(newStatus);

        if (newStatus == BriefStatus.REJECTED) {
            return review;
        }

        review.setRating(reviewBrief.getRating());
        review.setComment(reviewBrief.getComment());

        if (reviewBrief.getIsNew()) {
            review.setOnceModerated(true);
        }

        return review;
    }

    public ReviewBrief getReviewBrief(UserDetails userDetails, UUID briefId) {
        ReviewBrief reviewBrief = reviewBriefRepository.findById(briefId)
                .orElseThrow(() -> new RuntimeException("Review brief not found with id " + briefId));

        if (!(reviewBrief.getAuthor().getEmail().equals(userDetails.getUsername())
                || isModeratorOrAdmin(userDetails))) {
            throw new AccessDeniedException("User " + userDetails.getUsername() +
                    " has no access for review brief " + briefId);
        }

        return reviewBrief;
    }

    public List<ReviewBrief> getSelfReviewBriefs(UserDetails userDetails) {
        return reviewBriefRepository.findByAuthorEmail(userDetails.getUsername());
    }
}

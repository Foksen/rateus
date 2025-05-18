package ru.mirea.core.organization.service;

import jakarta.annotation.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import ru.mirea.core.auth.entity.User;
import ru.mirea.core.auth.service.UserService;
import ru.mirea.core.exception.UserNotFoundException;
import ru.mirea.core.organization.entity.Organization;
import ru.mirea.core.organization.entity.OrganizationType;
import ru.mirea.core.organization.entity.Review;
import ru.mirea.core.organization.repository.OrganizationRepository;

import java.util.*;

@Service
public class OrganizationService {

    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private UserService userService;

    public Organization createOrganization(
            UserDetails userDetails,
            String name,
            Integer organizationTypeId,
            String description,
            @Nullable String websiteUrl,
            String photoUrl
    ) {
        User owner = userService.findUserByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User not found with email " + userDetails.getUsername()));

        Organization organization = Organization.builder()
                .owner(User.builder().id(owner.getId()).build())
                .name(name)
                .organizationType(OrganizationType.builder().id(organizationTypeId).build())
                .description(description)
                .websiteUrl(websiteUrl)
                .photoUrl(photoUrl)
                .onceModerated(false)
                .build();

        // TODO: Brief logic

        return organizationRepository.save(organization);
    }

    public Organization updateOrganization(
            UserDetails userDetails,
            UUID id,
            String name,
            Integer organizationTypeId,
            String description,
            @Nullable String websiteUrl,
            String photoUrl
    ) {
        User owner = userService.findUserByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User not found with email " + userDetails.getUsername()));

        Organization oldOrganization = organizationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Organization not found with id " + id));

        if (!oldOrganization.getOwner().getEmail().equals(userDetails.getUsername())) {
            throw new AuthorizationDeniedException("User " + userDetails.getUsername() +
                    " has no access for organization " + id);
        }

        Organization organization = Organization.builder()
                .id(id)
                .owner(User.builder().id(owner.getId()).build())
                .name(name)
                .organizationType(OrganizationType.builder().id(organizationTypeId).build())
                .description(description)
                .websiteUrl(websiteUrl)
                .photoUrl(photoUrl)
                .onceModerated(oldOrganization.getOnceModerated())
                .createdAt(oldOrganization.getCreatedAt())
                .build();

        // TODO: Brief logic

        return organizationRepository.save(organization);
    }

    public List<Organization> getSelfOrganizations(UserDetails userDetails) {
        return organizationRepository.findByOwnerEmail(userDetails.getUsername());
    }

    public Organization getSelfOrganization(UserDetails userDetails, UUID id) {
        Organization organization = organizationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Organization not found with id " + id));

        if (!organization.getOwner().getEmail().equals(userDetails.getUsername())) {
            throw new AuthorizationDeniedException("User " + userDetails.getUsername() +
                    " has no access for organization " + id);
        }

        return organization;
    }

    public List<Organization> getPublicOrganizations(
            @Nullable String name,
            @Nullable String ratingIn,
            @Nullable String organizationTypeIdIn
    ) {
        if (name == null)
            name = "";

        List<Integer> organizationTypeIds = null;
        if (organizationTypeIdIn != null && !organizationTypeIdIn.isBlank()) {
            organizationTypeIds = Arrays.stream(organizationTypeIdIn.split(","))
                    .map(String::trim)
                    .filter(s -> !s.isBlank())
                    .map(Integer::valueOf)
                    .toList();
        }

        List<Organization> organisations = organizationRepository
                .findPublicOrganizationsWithReviews(name, organizationTypeIds);

        if (ratingIn == null || ratingIn.isBlank())
            return organisations;

        List<Integer> ratings = Arrays.stream(ratingIn.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .map(Integer::valueOf)
                .sorted()
                .toList();

        List<double[]> intervals = new ArrayList<>();
        int prev = 0;
        for (int x : ratings) {
            intervals.add(new double[]{prev, x});
            prev = x;
        }
        intervals.add(new double[]{prev, 5});

        return organisations.stream()
                .filter(organisation -> {
                    List<Review> reviews = organisation.getReviews();
                    Double avg = reviews == null ? null :
                            reviews.stream()
                                    .filter(r -> Boolean.TRUE.equals(r.getOnceModerated()))
                                    .map(Review::getRating)
                                    .filter(Objects::nonNull)
                                    .mapToInt(Integer::intValue)
                                    .average()
                                    .orElse(Double.NaN);
                    if (avg == null || avg.isNaN()) return false;
                    for (double[] range : intervals) {
                        if (avg >= range[0] && avg < range[1]) return true;
                    }
                    return false;
                })
                .toList();
    }

    public Organization getPublicOrganization(UUID id) {
        return organizationRepository.findById(id)
                .filter(Organization::getOnceModerated)
                .orElseThrow(() -> new RuntimeException("Organization not found with id " + id));
    }
}

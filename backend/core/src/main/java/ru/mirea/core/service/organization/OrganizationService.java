package ru.mirea.core.service.organization;

import jakarta.annotation.Nullable;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.mirea.core.entity.auth.User;
import ru.mirea.core.entity.brief.OrganizationBrief;
import ru.mirea.core.entity.organization.Organization;
import ru.mirea.core.entity.organization.OrganizationType;
import ru.mirea.core.entity.organization.Review;
import ru.mirea.core.exception.UserNotFoundException;
import ru.mirea.core.repository.organization.OrganizationRepository;
import ru.mirea.core.repository.organization.OrganizationTypeRepository;
import ru.mirea.core.service.auth.UserService;
import ru.mirea.core.service.brief.BriefService;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class OrganizationService {

    private final OrganizationRepository organizationRepository;
    private final OrganizationTypeRepository organizationTypeRepository;
    private final UserService userService;
    private final BriefService briefService;

    public OrganizationService(
            OrganizationRepository organizationRepository,
            OrganizationTypeRepository organizationTypeRepository,
            UserService userService,
            BriefService briefService
    ) {
        this.organizationRepository = organizationRepository;
        this.organizationTypeRepository = organizationTypeRepository;
        this.userService = userService;
        this.briefService = briefService;
    }

    @Transactional
    public OrganizationBrief createOrganization(
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

        Organization savedOrganization = organizationRepository.save(organization);

        return briefService.createOrganizationBrief(savedOrganization, true);
    }

    @Transactional
    public OrganizationBrief updateOrganization(
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

        Organization updatedOrganization = Organization.builder()
                .id(id)
                .owner(User.builder().id(owner.getId()).build())
                .name(name)
                .organizationType(OrganizationType.builder().id(organizationTypeId).build())
                .description(description)
                .websiteUrl(websiteUrl)
                .photoUrl(photoUrl)
                .build();

        return briefService.createOrganizationBrief(updatedOrganization, false);
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

    public List<OrganizationType> getOrganizationTypes() {
        return StreamSupport.stream(organizationTypeRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    public List<OrganizationType> getAvailableOrganizationTypes() {
        return StreamSupport.stream(organizationTypeRepository.findByIsAvailableTrue().spliterator(), false)
                .collect(Collectors.toList());
    }

    @Transactional
    public OrganizationType saveOrganizationType(OrganizationType organizationType) {
        return organizationTypeRepository.save(organizationType);
    }

    @Transactional
    public void deleteOrganizationType(int id) {
        organizationTypeRepository.deleteById(id);
    }
}

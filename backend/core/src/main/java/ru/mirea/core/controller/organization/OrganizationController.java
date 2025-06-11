package ru.mirea.core.controller.organization;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ru.mirea.core.dto.brief.OrganizationBriefResponse;
import ru.mirea.core.dto.organization.OrganizationResponse;
import ru.mirea.core.dto.organization.OrganizationSaveRequest;
import ru.mirea.core.entity.brief.OrganizationBrief;
import ru.mirea.core.entity.organization.Organization;
import ru.mirea.core.mapper.brief.BriefMapper;
import ru.mirea.core.mapper.organization.OrganizationMapper;
import ru.mirea.core.service.organization.OrganizationService;

import java.util.List;
import java.util.UUID;

@Tag(name = "Organizations", description = "Операции с организациями")
@RestController
@RequestMapping("/organizations")
public class OrganizationController {

    private final OrganizationService organizationService;
    private final OrganizationMapper organizationMapper;
    private final BriefMapper briefMapper;

    public OrganizationController(
            OrganizationService organizationService,
            OrganizationMapper organizationMapper,
            BriefMapper briefMapper
    ) {
        this.organizationService = organizationService;
        this.organizationMapper = organizationMapper;
        this.briefMapper = briefMapper;
    }

    @SecurityRequirement(name = "BearerAuth")
    @PostMapping
    public OrganizationBriefResponse createOrganization(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody @Valid OrganizationSaveRequest request
    ) {
        OrganizationBrief organizationBrief = organizationService.createOrganization(
                userDetails,
                request.name(),
                request.organizationTypeId(),
                request.description(),
                request.websiteUrl(),
                request.photoUrl()
        );
        return briefMapper.mapOrganizationBrief(organizationBrief);
    }

    @SecurityRequirement(name = "BearerAuth")
    @PutMapping("/{organizationId}")
    public OrganizationBriefResponse updateOrganization(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable("organizationId") UUID organizationId,
            @RequestBody @Valid OrganizationSaveRequest request
    ) {
        OrganizationBrief organizationBrief = organizationService.updateOrganization(
                userDetails,
                organizationId,
                request.name(),
                request.organizationTypeId(),
                request.description(),
                request.websiteUrl(),
                request.photoUrl()
        );
        return briefMapper.mapOrganizationBrief(organizationBrief);
    }

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/self")
    public List<OrganizationResponse> getSelfOrganizations(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        List<Organization> organizations = organizationService.getSelfOrganizations(userDetails);
        return organizationMapper.map(organizations);
    }

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/self/{organizationId}")
    public OrganizationResponse getSelfOrganization(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable("organizationId") UUID organizationId
    ) {
        Organization organization = organizationService.getSelfOrganization(userDetails, organizationId);
        return organizationMapper.map(organization);
    }

    @GetMapping("/public")
    public List<OrganizationResponse> getPublicOrganizations(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String ratingIn,
            @RequestParam(required = false) String organizationTypeIn
    ) {
        List<Organization> organizations = organizationService.getPublicOrganizations(
                name,
                ratingIn,
                organizationTypeIn
        );
        return organizationMapper.map(organizations);
    }

    @GetMapping("/public/{organizationId}")
    public OrganizationResponse getPublicOrganization(
            @PathVariable(name = "organizationId") UUID organizationId
    ) {
        Organization organization = organizationService.getPublicOrganization(organizationId);
        return organizationMapper.map(organization);
    }
}

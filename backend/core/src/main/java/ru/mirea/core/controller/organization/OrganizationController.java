package ru.mirea.core.controller.organization;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ru.mirea.core.dto.organization.*;
import ru.mirea.core.entity.organization.Organization;
import ru.mirea.core.mapper.organization.OrganizationMapper;
import ru.mirea.core.service.organization.OrganizationService;

import java.util.List;
import java.util.UUID;

@Tag(name = "Organizations", description = "Операции с организациями")
@RestController
@RequestMapping("/organizations")
public class OrganizationController {

    @Autowired
    private OrganizationService organizationService;

    @Autowired
    private OrganizationMapper organizationMapper;

    @SecurityRequirement(name = "BearerAuth")
    @PostMapping
    public OrganizationResponse createOrganization(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody OrganizationSaveRequest request
    ) {
        Organization organization = organizationService.createOrganization(
                userDetails,
                request.name(),
                request.organizationTypeId(),
                request.description(),
                request.websiteUrl(),
                request.photoUrl()
        );
        return organizationMapper.map(organization);
    }

    @SecurityRequirement(name = "BearerAuth")
    @PutMapping("/{id}")
    public OrganizationResponse updateOrganization(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable("id") UUID id,
            @RequestBody OrganizationSaveRequest request
    ) {
        Organization organization = organizationService.updateOrganization(
                userDetails,
                id,
                request.name(),
                request.organizationTypeId(),
                request.description(),
                request.websiteUrl(),
                request.photoUrl()
        );
        return organizationMapper.map(organization);
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
    @GetMapping("/self/{id}")
    public OrganizationResponse getSelfOrganization(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable("id") UUID id
    ) {
        Organization organization = organizationService.getSelfOrganization(userDetails, id);
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

    @GetMapping("/public/{id}")
    public OrganizationResponse getPublicOrganization(
            @PathVariable(name = "id") UUID id
    ) {
        Organization organization = organizationService.getPublicOrganization(id);
        return organizationMapper.map(organization);
    }
}

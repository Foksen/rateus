package ru.mirea.core.controller.organization;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ru.mirea.core.dto.organization.*;
import ru.mirea.core.entity.organization.Organization;
import ru.mirea.core.mapper.organization.OrganizationMapper;
import ru.mirea.core.mapper.organization.OrganizationTypeMapper;
import ru.mirea.core.service.organization.OrganizationService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/organizations")
public class OrganizationController {

    @Autowired
    private OrganizationService organizationService;

    @Autowired
    private OrganizationMapper organizationMapper;

    @Autowired
    private OrganizationTypeMapper organizationTypeMapper;

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

    @GetMapping
    @RequestMapping("/self")
    public List<OrganizationResponse> getSelfOrganizations(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        List<Organization> organizations = organizationService.getSelfOrganizations(userDetails);
        return organizationMapper.map(organizations);
    }

    @GetMapping
    @RequestMapping("/self/{id}")
    public OrganizationResponse getSelfOrganization(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable("id") UUID id
    ) {
        Organization organization = organizationService.getSelfOrganization(userDetails, id);
        return organizationMapper.map(organization);
    }

    @GetMapping
    @RequestMapping("/public")
    public List<OrganizationResponse> getPublicOrganizations(
            @PathVariable(required = false) String name,
            @PathVariable(required = false) String ratingIn,
            @PathVariable(required = false) String organizationTypeIn
    ) {
        List<Organization> organizations = organizationService.getPublicOrganizations(
                name,
                ratingIn,
                organizationTypeIn
        );
        return organizationMapper.map(organizations);
    }

    @GetMapping
    @RequestMapping("/public/{id}")
    public OrganizationResponse getPublicOrganization(
            @PathVariable(name = "id") UUID id
    ) {
        Organization organization = organizationService.getPublicOrganization(id);
        return organizationMapper.map(organization);
    }

    @GetMapping("/types")
    public List<OrganizationTypeResponse> getOrganizationTypes() {
        return organizationTypeMapper.map(organizationService.getOrganizationTypes());
    }

    @GetMapping("/types/available")
    public List<OrganizationTypeResponse> getAvailableOrganizationTypes() {
        return organizationTypeMapper.map(organizationService.getAvailableOrganizationTypes());
    }

    @PostMapping("/types")
    public OrganizationTypeResponse createOrganizationType(@RequestBody OrganizationTypeResponse organizationType) {
        return organizationTypeMapper.map(organizationService.saveOrganizationType(organizationTypeMapper.map(organizationType)));
    }

    @DeleteMapping("/types/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOrganization(@PathVariable("id") int id) {
        organizationService.deleteOrganizationType(id);
    }
}

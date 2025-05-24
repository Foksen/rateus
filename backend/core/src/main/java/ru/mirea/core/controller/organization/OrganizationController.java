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
    public OrganizationWrapper createOrganization(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody SaveOrganizationRequest request
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
    public OrganizationWrapper updateOrganization(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable("id") UUID id,
            @RequestBody SaveOrganizationRequest request
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
    public OrganizationListWrapper getSelfOrganizations(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        List<Organization> organizations = organizationService.getSelfOrganizations(userDetails);
        return organizationMapper.map(organizations);
    }

    @GetMapping
    @RequestMapping("/self/{id}")
    public OrganizationWrapper getSelfOrganization(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable("id") UUID id
    ) {
        Organization organization = organizationService.getSelfOrganization(userDetails, id);
        return organizationMapper.map(organization);
    }

    @GetMapping
    @RequestMapping("/public")
    public OrganizationListWrapper getPublicOrganizations(
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
    public OrganizationWrapper getPublicOrganization(
            @PathVariable(name = "id") UUID id
    ) {
        Organization organization = organizationService.getPublicOrganization(id);
        return organizationMapper.map(organization);
    }

    @GetMapping("/types")
    public OrganizationTypeListWrapper getOrganizationTypes() {
        return organizationTypeMapper.map(organizationService.getOrganizationTypes());
    }

    @GetMapping("/types/available")
    public OrganizationTypeListWrapper getAvailableOrganizationTypes() {
        return organizationTypeMapper.map(organizationService.getAvailableOrganizationTypes());
    }

    @PostMapping("/types")
    public OrganizationTypeWrapper createOrganizationType(@RequestBody OrganizationTypeWrapper organizationType) {
        return organizationTypeMapper.map(organizationService.saveOrganizationType(organizationTypeMapper.map(organizationType)));
    }

    @DeleteMapping("/types/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOrganization(@PathVariable("id") int id) {
        organizationService.deleteOrganizationType(id);
    }
}

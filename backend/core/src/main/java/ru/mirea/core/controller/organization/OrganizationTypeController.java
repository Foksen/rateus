package ru.mirea.core.controller.organization;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.mirea.core.dto.organization.OrganizationTypeResponse;
import ru.mirea.core.mapper.organization.OrganizationTypeMapper;
import ru.mirea.core.service.organization.OrganizationService;

import java.util.List;

@Tag(name = "Organization types", description = "Операции с видами организаций")
@RestController
@RequestMapping("/organizations/types")
public class OrganizationTypeController {

    @Autowired
    private OrganizationService organizationService;

    @Autowired
    private OrganizationTypeMapper organizationTypeMapper;

    @GetMapping("/types")
    public List<OrganizationTypeResponse> getOrganizationTypes() {
        return organizationTypeMapper.map(organizationService.getOrganizationTypes());
    }

    @GetMapping("/types/available")
    public List<OrganizationTypeResponse> getAvailableOrganizationTypes() {
        return organizationTypeMapper.map(organizationService.getAvailableOrganizationTypes());
    }

    @SecurityRequirement(name = "BearerAuth")
    @PostMapping("/types")
    public OrganizationTypeResponse createOrganizationType(@RequestBody OrganizationTypeResponse organizationType) {
        return organizationTypeMapper.map(organizationService.saveOrganizationType(organizationTypeMapper.map(organizationType)));
    }

    @SecurityRequirement(name = "BearerAuth")
    @DeleteMapping("/types/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOrganization(@PathVariable("id") int id) {
        organizationService.deleteOrganizationType(id);
    }
}

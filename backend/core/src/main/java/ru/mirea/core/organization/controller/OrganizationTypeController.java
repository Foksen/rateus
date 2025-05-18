package ru.mirea.core.organization.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.mirea.core.organization.dto.OrganizationTypeListWrapper;
import ru.mirea.core.organization.dto.OrganizationTypeWrapper;
import ru.mirea.core.organization.mapper.OrganizationTypeMapper;
import ru.mirea.core.organization.service.OrganizationTypeService;

@RestController
@RequestMapping("/api/organizations/types")
public class OrganizationTypeController {

    @Autowired
    private OrganizationTypeService service;

    @Autowired
    private OrganizationTypeMapper mapper;

    @GetMapping
    public OrganizationTypeListWrapper getOrganizationTypes() {
        return mapper.map(service.getOrganizationTypes());
    }

    @GetMapping("/available")
    public OrganizationTypeListWrapper getAvailableOrganizationTypes() {
        return mapper.map(service.getAvailableOrganizationTypes());
    }

    @PostMapping
    public OrganizationTypeWrapper createOrganizationType(@RequestBody OrganizationTypeWrapper organizationType) {
        return mapper.map(service.saveOrganizationType(mapper.map(organizationType)));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOrganization(@PathVariable("id") int id) {
        service.deleteOrganizationType(id);
    }
}

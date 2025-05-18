package ru.mirea.core.organization.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.mirea.core.organization.entity.OrganizationType;
import ru.mirea.core.organization.repository.OrganizationTypeRepository;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class OrganizationTypeService {

    @Autowired
    private OrganizationTypeRepository organizationTypeRepository;

    public List<OrganizationType> getOrganizationTypes() {
        return StreamSupport.stream(organizationTypeRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    public List<OrganizationType> getAvailableOrganizationTypes() {
        return StreamSupport.stream(organizationTypeRepository.findByIsAvailableTrue().spliterator(), false)
                .collect(Collectors.toList());
    }

    public OrganizationType saveOrganizationType(OrganizationType organizationType) {
        return organizationTypeRepository.save(organizationType);
    }

    public void deleteOrganizationType(int id) {
        organizationTypeRepository.deleteById(id);
    }
}

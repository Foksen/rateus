package ru.mirea.core.organization.repository;

import org.springframework.data.repository.CrudRepository;
import ru.mirea.core.organization.entity.OrganizationType;

public interface OrganizationTypeRepository extends CrudRepository<OrganizationType, Integer> {
    Iterable<OrganizationType> findByIsAvailableTrue();
}

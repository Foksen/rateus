package ru.mirea.core.repository.organization;

import org.springframework.data.repository.CrudRepository;
import ru.mirea.core.entity.organization.OrganizationType;

public interface OrganizationTypeRepository extends CrudRepository<OrganizationType, Integer> {
    Iterable<OrganizationType> findByIsAvailableTrue();
}

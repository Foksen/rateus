package ru.mirea.core.repository.brief;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.mirea.core.entity.brief.OrganizationBrief;

import java.util.List;
import java.util.UUID;

public interface OrganizationBriefRepository extends JpaRepository<OrganizationBrief, UUID> {
    List<OrganizationBrief> findByOwnerEmail(String email);
}

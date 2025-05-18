package ru.mirea.core.organization.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.mirea.core.organization.entity.Organization;

import java.util.List;
import java.util.UUID;

public interface OrganizationRepository extends JpaRepository<Organization, UUID> {
    List<Organization> findByOwnerEmail(String email);

    @Query("""
                SELECT DISTINCT o FROM Organization o
                LEFT JOIN FETCH o.reviews
                WHERE o.onceModerated = true
                  AND (:name = '' OR LOWER(o.name) LIKE LOWER(CONCAT('%', :name, '%')))
                  AND (:organizationTypeIds IS NULL OR o.organizationType.id IN :organizationTypeIds)
            """)
    List<Organization> findPublicOrganizationsWithReviews(
            @Param("name") String name,
            @Param("organizationTypeIds") List<Integer> organizationTypeIds
    );
}

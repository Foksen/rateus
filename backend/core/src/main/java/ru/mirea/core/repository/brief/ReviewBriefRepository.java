package ru.mirea.core.repository.brief;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.mirea.core.entity.brief.ReviewBrief;

import java.util.List;
import java.util.UUID;

public interface ReviewBriefRepository extends JpaRepository<ReviewBrief, UUID> {
    List<ReviewBrief> findByAuthorEmail(String email);
}

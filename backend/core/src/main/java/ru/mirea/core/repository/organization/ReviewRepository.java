package ru.mirea.core.repository.organization;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.mirea.core.entity.organization.Review;

import java.util.UUID;

public interface ReviewRepository extends JpaRepository<Review, UUID> { }

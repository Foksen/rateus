package ru.mirea.core.organization.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.mirea.core.organization.entity.Review;

import java.util.UUID;

public interface ReviewRepository extends JpaRepository<Review, UUID> { }

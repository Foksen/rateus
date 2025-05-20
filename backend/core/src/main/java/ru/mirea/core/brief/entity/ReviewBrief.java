package ru.mirea.core.brief.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcType;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;
import ru.mirea.core.auth.entity.User;
import ru.mirea.core.organization.entity.Organization;
import ru.mirea.core.organization.entity.Review;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "review_briefs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReviewBrief {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;

    @NotNull
    @ManyToOne
    @JsonBackReference
    User author;

    @NotNull
    @ManyToOne
    @JsonBackReference
    Review review;

    @NotNull
    @ManyToOne
    @JsonBackReference
    Organization organization;

    @NotNull
    @Builder.Default
    Boolean isNew = true;

    @NotNull
    @Min(1)
    @Max(5)
    Integer rating;

    @NotNull
    @Enumerated(EnumType.STRING)
    @JdbcType(PostgreSQLEnumJdbcType.class)
    BriefStatus status;

    @CreationTimestamp
    Instant createdAt;

    @UpdateTimestamp
    Instant updatedAt;
}

package ru.mirea.core.entity.brief;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcType;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;
import ru.mirea.core.entity.auth.User;
import ru.mirea.core.entity.organization.Organization;
import ru.mirea.core.entity.organization.OrganizationType;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "organization_briefs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrganizationBrief {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;

    @NotNull
    @ManyToOne
    @JsonBackReference
    User owner;

    @NotNull
    @ManyToOne
    @JsonBackReference
    Organization organization;

    @NotNull
    @Builder.Default
    Boolean isNew = true;

    @NotNull
    String name;

    @NotNull
    @ManyToOne
    @JsonBackReference
    OrganizationType organizationType;

    @NotNull
    String description;

    @Nullable
    String websiteUrl;

    @Nullable
    String photoUrl;

    @NotNull
    @Enumerated(EnumType.STRING)
    @JdbcType(PostgreSQLEnumJdbcType.class)
    BriefStatus status;

    @CreationTimestamp
    Instant createdAt;

    @UpdateTimestamp
    Instant updatedAt;
}

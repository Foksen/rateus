package ru.mirea.core.organization.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import ru.mirea.core.auth.entity.User;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "organizations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;

    @NotNull
    @ManyToOne
    @JsonBackReference
    User owner;

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
    @Builder.Default
    Boolean onceModerated = false;

    @CreationTimestamp
    Instant createdAt;

    @UpdateTimestamp
    Instant updatedAt;

    @OneToMany(mappedBy = "organization")
    @JsonManagedReference
    List<Review> reviews;
}

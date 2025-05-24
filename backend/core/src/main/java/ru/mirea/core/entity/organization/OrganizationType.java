package ru.mirea.core.entity.organization;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "organization_types")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrganizationType {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "organization_type_seq_gen")
    @SequenceGenerator(name = "organization_type_seq_gen", sequenceName = "organization_type_seq", allocationSize = 1)
    Integer id;

    @Column(nullable = false, unique = true)
    String name;

    @NotNull
    @Builder.Default
    Boolean isAvailable = true;
}

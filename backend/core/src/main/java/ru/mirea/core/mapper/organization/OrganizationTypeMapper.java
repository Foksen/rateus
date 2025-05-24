package ru.mirea.core.mapper.organization;

import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import ru.mirea.core.dto.organization.OrganizationTypeResponse;
import ru.mirea.core.entity.organization.OrganizationType;

import java.util.List;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface OrganizationTypeMapper {

    OrganizationTypeResponse map(OrganizationType organizationType);

    OrganizationType map(OrganizationTypeResponse organizationType);

    default List<OrganizationTypeResponse> map(List<OrganizationType> organizationTypes) {
        return organizationTypes.stream().map(this::map).toList();
    }
}

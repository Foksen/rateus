package ru.mirea.core.organization.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import ru.mirea.core.organization.dto.OrganizationTypeListWrapper;
import ru.mirea.core.organization.dto.OrganizationTypeWrapper;
import ru.mirea.core.organization.entity.OrganizationType;

import java.util.List;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface OrganizationTypeMapper {

    OrganizationTypeWrapper map(OrganizationType organizationType);

    OrganizationType map(OrganizationTypeWrapper organizationType);

    default OrganizationTypeListWrapper map(List<OrganizationType> organizationTypes) {
        return new OrganizationTypeListWrapper(organizationTypes.stream().map(this::map).toList());
    }
}

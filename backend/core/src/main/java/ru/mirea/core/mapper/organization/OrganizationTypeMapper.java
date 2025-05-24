package ru.mirea.core.mapper.organization;

import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import ru.mirea.core.dto.organization.OrganizationTypeListWrapper;
import ru.mirea.core.dto.organization.OrganizationTypeWrapper;
import ru.mirea.core.entity.organization.OrganizationType;

import java.util.List;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface OrganizationTypeMapper {

    OrganizationTypeWrapper map(OrganizationType organizationType);

    OrganizationType map(OrganizationTypeWrapper organizationType);

    default OrganizationTypeListWrapper map(List<OrganizationType> organizationTypes) {
        return new OrganizationTypeListWrapper(organizationTypes.stream().map(this::map).toList());
    }
}

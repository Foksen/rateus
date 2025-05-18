package ru.mirea.core.auth.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import ru.mirea.core.auth.dto.UserPatchDataWrapper;
import ru.mirea.core.auth.dto.UserWrapper;
import ru.mirea.core.auth.entity.User;
import ru.mirea.core.auth.model.UserPatchData;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface UserMapper {

    UserPatchData map(UserPatchDataWrapper userPatchDataWrapper);

    UserPatchDataWrapper map(UserPatchData userPatchData);

    UserWrapper map(User user);
}

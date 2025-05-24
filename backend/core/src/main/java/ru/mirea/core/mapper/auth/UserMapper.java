package ru.mirea.core.mapper.auth;

import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import ru.mirea.core.dto.auth.UserPatchDataWrapper;
import ru.mirea.core.dto.auth.UserWrapper;
import ru.mirea.core.entity.auth.User;
import ru.mirea.core.model.auth.UserPatchData;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface UserMapper {

    UserPatchData map(UserPatchDataWrapper userPatchDataWrapper);

    UserPatchDataWrapper map(UserPatchData userPatchData);

    UserWrapper map(User user);
}

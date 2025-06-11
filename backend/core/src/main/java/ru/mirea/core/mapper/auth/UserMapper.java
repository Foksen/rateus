package ru.mirea.core.mapper.auth;

import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import ru.mirea.core.dto.auth.UserPatchRequest;
import ru.mirea.core.dto.auth.UserResponse;
import ru.mirea.core.entity.auth.User;
import ru.mirea.core.model.UserPatchData;

import java.util.List;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface UserMapper {

    UserPatchData map(UserPatchRequest userPatchRequest);

    UserPatchRequest map(UserPatchData userPatchData);

    UserResponse map(User user);

    default List<UserResponse> map(List<User> users) {
        return users.stream().map(this::map).toList();
    }
}

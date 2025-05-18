package ru.mirea.core.auth.mapper;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import ru.mirea.core.auth.entity.User;

@Component
public class UserDetailsMapper {

    public UserDetails mapUserToUserDetails(User user) {
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .roles(user.getUserRole().name())
                .accountLocked(user.getIsBlocked())
                .build();
    }
}

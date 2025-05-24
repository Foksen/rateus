package ru.mirea.core.mapper.auth;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import ru.mirea.core.entity.auth.User;

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

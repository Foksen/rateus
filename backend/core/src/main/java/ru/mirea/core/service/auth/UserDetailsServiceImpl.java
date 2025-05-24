package ru.mirea.core.service.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.mirea.core.entity.auth.User;
import ru.mirea.core.exception.UserNotFoundException;
import ru.mirea.core.mapper.auth.UserDetailsMapper;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Autowired
    private UserDetailsMapper userDetailsMapper;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userService.findUserByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email " + email));
        return userDetailsMapper.mapUserToUserDetails(user);
    }
}

package ru.mirea.core.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.mirea.core.auth.entity.User;
import ru.mirea.core.auth.mapper.UserDetailsMapper;
import ru.mirea.core.exception.UserNotFoundException;

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

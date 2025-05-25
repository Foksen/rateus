package ru.mirea.core.util;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserUtil {

    public static boolean isModeratorOrAdmin(UserDetails userDetails) {
        return userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(authority ->
                        authority.equals("ROLE_MODERATOR") || authority.equals("ROLE_ADMIN")
                );
    }
}

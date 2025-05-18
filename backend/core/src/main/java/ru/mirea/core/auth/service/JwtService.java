package ru.mirea.core.auth.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import ru.mirea.core.auth.entity.User;
import ru.mirea.core.exception.UserNotFoundException;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    @Autowired
    private UserService userService;

    @Value("${jwt.secret}")
    private String jwtSigningKey;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    private SecretKey key;

    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(jwtSigningKey.getBytes());
    }

    public String generateToken(Authentication authentication) {
        String email = ((UserDetails) authentication.getPrincipal()).getUsername();
        User user = userService.findUserByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("Cannot find user email from authentication " +
                        "during JWT token generation"));

        Date now = new Date();
        return Jwts.builder()
                .subject(user.getId().toString())
                .issuedAt(now)
                .expiration(new Date(now.getTime() + jwtExpiration))
                .claim("email", email)
                .claim("name", user.getName())
                .claim("surname", user.getSurname())
                .claim("role", user.getUserRole())
                .claim("avatarUrl", user.getAvatarUrl())
                .signWith(key)
                .compact();
    }

    public String getEmail(String token) {
        return getClaims(token).get("email").toString();
    }

    public Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean isTokenValid(String token) {
        try {
            Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            System.out.println("Invalid JWT: " + e.getMessage());
        }
        return false;
    }

}


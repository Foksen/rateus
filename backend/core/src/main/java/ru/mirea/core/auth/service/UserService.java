package ru.mirea.core.auth.service;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.mirea.core.auth.entity.User;
import ru.mirea.core.auth.entity.UserProvider;
import ru.mirea.core.auth.entity.UserRole;
import ru.mirea.core.auth.model.UserPatchData;
import ru.mirea.core.exception.UserAlreadyExistsException;
import ru.mirea.core.auth.repository.UserRepository;
import ru.mirea.core.exception.UserNotFoundException;

import java.util.Optional;
import java.util.UUID;

import static java.util.Objects.requireNonNullElse;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder;

    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findYandexUserByEmail(String email) {
        return userRepository.findByEmailAndUserProvider(email, UserProvider.YANDEX);
    }

    public User saveUser(User user) {
        Optional<User> sameEmailUser = findUserByEmail(user.getEmail());
        if (sameEmailUser.isPresent()) {
            throw new UserAlreadyExistsException("User already exists with email " + user.getEmail());
        }
        return userRepository.save(user);
    }

    public UserPatchData patchUser(UserDetails userDetails, UUID id, UserPatchData userPatchData)
            throws BadRequestException
    {
        User oldUser = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id " + id));

        boolean isSelfUser = userDetails.getUsername().equals(oldUser.getEmail());
        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_" + UserRole.ADMIN.name()));

        if (!isSelfUser && !isAdmin) {
            throw new AccessDeniedException("User " + userDetails.getUsername() + " has no access to user " + id);
        }

        if (isSelfUser) {
            if (userPatchData.userRole() != null && userPatchData.userRole() != UserRole.OWNER) {
                throw new AccessDeniedException("User " + userDetails.getUsername() + " can change role only to owner");
            }

            if (userPatchData.isBlocked() != null) {
                throw new AccessDeniedException("User " + userDetails.getUsername() + " cannot change block flag");
            }
        }

        if (userPatchData.password() != null && oldUser.getUserProvider() != UserProvider.EMAIL) {
            throw new BadRequestException("Password can be changed only for users with EMAIL user provider");
        }

        String email = requireNonNullElse(userPatchData.email(), oldUser.getEmail());
        String passwordEncoded = (userPatchData.password() != null) ?
                passwordEncoder.encode(userPatchData.password()) : oldUser.getPassword();

        User newUser = User.builder()
                .id(oldUser.getId())
                .email(email)
                .password(passwordEncoded)
                .userProvider(oldUser.getUserProvider())
                .userRole(requireNonNullElse(userPatchData.userRole(), oldUser.getUserRole()))
                .isBlocked(requireNonNullElse(userPatchData.isBlocked(), oldUser.getIsBlocked()))
                .name(requireNonNullElse(userPatchData.name(), oldUser.getName()))
                .surname(requireNonNullElse(userPatchData.surname(), oldUser.getSurname()))
                .avatarUrl(requireNonNullElse(userPatchData.avatarUrl(), oldUser.getAvatarUrl()))
                .createdAt(oldUser.getCreatedAt())
                .build();
        User savedUser = userRepository.save(newUser);

        return userPatchData;
    }
}

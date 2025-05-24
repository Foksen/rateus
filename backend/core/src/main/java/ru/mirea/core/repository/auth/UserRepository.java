package ru.mirea.core.repository.auth;

import org.springframework.data.repository.CrudRepository;
import ru.mirea.core.entity.auth.User;
import ru.mirea.core.entity.auth.UserProvider;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends CrudRepository<User, UUID> {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndUserProvider(String email, UserProvider userProvider);
}

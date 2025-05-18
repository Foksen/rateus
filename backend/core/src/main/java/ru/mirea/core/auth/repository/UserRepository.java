package ru.mirea.core.auth.repository;

import org.springframework.data.repository.CrudRepository;
import ru.mirea.core.auth.entity.User;
import ru.mirea.core.auth.entity.UserProvider;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends CrudRepository<User, UUID> {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndUserProvider(String email, UserProvider userProvider);
}

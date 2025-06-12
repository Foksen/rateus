package ru.mirea.core.controller.auth;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ru.mirea.core.dto.auth.UserPatchRequest;
import ru.mirea.core.dto.auth.UserResponse;
import ru.mirea.core.entity.auth.User;
import ru.mirea.core.mapper.auth.UserMapper;
import ru.mirea.core.model.UserPatchData;
import ru.mirea.core.service.auth.UserService;

import java.util.List;
import java.util.UUID;

@Slf4j
@SecurityRequirement(name = "BearerAuth")
@Tag(name = "Users", description = "Операции с пользователями")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserService userService;

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping
    public List<UserResponse> getUsers() {
        List<User> users = userService.getUsers();
        return userMapper.map(users);
    }

    @SecurityRequirement(name = "BearerAuth")
    @PatchMapping("/{userId}")
    public UserResponse patchUser(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable("userId") UUID userId,
            @RequestBody UserPatchRequest userPatchRequest
    ) throws BadRequestException {
        UserPatchData userPatchData = userMapper.map(userPatchRequest);
        log.info("{}", userPatchData);
        User user = userService.patchUser(userDetails, userId, userPatchData);
        return userMapper.map(user);
    }

    @SecurityRequirement(name = "BearerAuth")
    @DeleteMapping("/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable UUID userId) {
        userService.deleteUser(userId);
    }

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/self")
    public UserResponse getSelfUser(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return userMapper.map(userService.getSelfUser(userDetails));
    }
}

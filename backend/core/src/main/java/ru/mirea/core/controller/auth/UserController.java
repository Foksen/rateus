package ru.mirea.core.controller.auth;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ru.mirea.core.dto.auth.UserPatchDataWrapper;
import ru.mirea.core.mapper.auth.UserMapper;
import ru.mirea.core.model.UserPatchData;
import ru.mirea.core.service.auth.UserService;

import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserService userService;

    @PatchMapping
    @RequestMapping("/{id}")
    public UserPatchDataWrapper patchUser(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable("id") UUID id,
            @RequestBody UserPatchDataWrapper userPatchDataWrapper
    ) throws BadRequestException {
        UserPatchData userPatchData = userMapper.map(userPatchDataWrapper);
        UserPatchData result = userService.patchUser(userDetails, id, userPatchData);
        return userMapper.map(result);
    }
}

"use client";

import { ACCENT_COLOR, RAINBOW_AVATAR_COLORS } from "@/constants/ui";
import { mapRoleName, USER_ROLE } from "@/constants/user-roles";
import { pickPalette } from "@/lib/utils/pick-palette";
import {
  Avatar,
  Box,
  HStack,
  SkeletonCircle,
  Stack,
  Text,
  useAvatar,
} from "@chakra-ui/react";

function getSkeletonSize(size) {
  switch (size) {
    case "sm":
      return "9";
    case "md":
      return "10";
    default:
      return "20";
  }
}

function getRoleMarginBottom(size) {
  switch (size) {
    case "sm":
      return "3px";
    default:
      return null;
  }
}

export function Profile({
  size,
  username,
  avatarUrl,
  role,
  hideRole,
  ...props
}) {
  const avatar = useAvatar();

  username = username ?? "Таинственный незнакомец";

  return (
    <HStack gap="3" align="center" direction="row" {...props}>
      <Avatar.RootProvider
        size={size}
        colorPalette={
          RAINBOW_AVATAR_COLORS ? pickPalette(username) : ACCENT_COLOR
        }
        value={avatar}
      >
        {avatarUrl && <Avatar.Image src={avatarUrl} />}
        {avatarUrl ? (
          <Avatar.Fallback asChild>
            <Box bg="bg">
              {avatar.loaded ? null : (
                <SkeletonCircle size={getSkeletonSize(size)} />
              )}
            </Box>
          </Avatar.Fallback>
        ) : (
          <Avatar.Fallback name={username} />
        )}
      </Avatar.RootProvider>

      <Stack gap="0">
        <Text fontWeight="medium">{username}</Text>
        {!hideRole && role != USER_ROLE.USER && (
          <Text mb={getRoleMarginBottom(size)} textStyle="xs">
            {mapRoleName(role)}
          </Text>
        )}
      </Stack>
    </HStack>
  );
}

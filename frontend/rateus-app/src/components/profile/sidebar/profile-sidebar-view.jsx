import { Profile } from "@/components/common/profile/profile";
import {
  PROFILE_COMMON_PAGE,
  PROFILE_PAGE,
  PROFILE_PAGE_AUTHORITIES,
} from "@/constants/profile-pages";
import { ACCENT_COLOR, RAINBOW_AVATAR_COLORS } from "@/constants/ui";
import { mapRoleName, USER_ROLE } from "@/constants/user-roles";
import { pickPalette } from "@/lib/utils/pick-palette";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  SkeletonCircle,
  SkeletonText,
  Text,
  VStack,
  Stack,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { PiSignOut } from "react-icons/pi";
import {
  TbBuilding,
  TbBuildingCog,
  TbBuildings,
  TbCategory2,
  TbMessage,
  TbMessageCog,
  TbMessages,
  TbSettings,
  TbUsers,
} from "react-icons/tb";

const SidebarLink = ({ title, icon, href, ...props }) => (
  <Button
    variant="ghost"
    borderRadius="none"
    w="full"
    px="3"
    py="5"
    justifyContent="flex-start"
    rounded="md"
    asChild
    {...props}
  >
    <Link href={href || "/"}>
      {icon && (
        <Icon size="md" mr="2px">
          {icon}
        </Icon>
      )}{" "}
      {title}
    </Link>
  </Button>
);

export const SidebarProfile = ({
  size,
  username,
  useravatar,
  role,
  ...props
}) => (
  <HStack gap="14px" {...props}>
    {username ? (
      <AvatarGroup size={size}>
        <Avatar.Root
          colorPalette={
            RAINBOW_AVATAR_COLORS ? pickPalette(username) : ACCENT_COLOR
          }
        >
          <Avatar.Fallback name={username} />
          {useravatar && <Avatar.Image src={useravatar} />}
        </Avatar.Root>
      </AvatarGroup>
    ) : (
      <SkeletonCircle size="9" />
    )}

    <VStack align="start" gap="0" w="full">
      {username ? (
        <Text fontWeight="medium">{username}</Text>
      ) : (
        <SkeletonText noOfLines="1" />
      )}
      <Text textStyle="xs">{role != USER_ROLE.USER && mapRoleName(role)}</Text>
    </VStack>
  </HStack>
);

function createSidebarLink(profilePage, key) {
  const href = `/profile/${profilePage}`;
  switch (profilePage) {
    case PROFILE_PAGE.REVIEWS_SELF:
      return (
        <SidebarLink
          title="Мои отзывы"
          icon={<TbMessage />}
          href={href}
          key={key}
        />
      );

    case PROFILE_PAGE.REVIEW_BRIEFS_SELF:
      return (
        <SidebarLink
          title="Заявки на отзывы"
          icon={<TbMessageCog />}
          href={href}
          key={key}
        />
      );

    case PROFILE_PAGE.REVIEWS:
      return (
        <SidebarLink
          title="Все отзывы"
          icon={<TbMessages />}
          href={href}
          key={key}
        />
      );

    case PROFILE_PAGE.REVIEW_BRIEFS:
      return (
        <SidebarLink
          title="Новые отзывы"
          icon={<TbMessageCog />}
          href={href}
          key={key}
        />
      );

    case PROFILE_PAGE.ORGANIZATIONS_SELF:
      return (
        <SidebarLink
          title="Мои организации"
          icon={<TbBuilding />}
          href={href}
          key={key}
        />
      );

    case PROFILE_PAGE.ORGANIZATION_BRIEFS_SELF:
      return (
        <SidebarLink
          title="Заявки на организации"
          icon={<TbBuildingCog />}
          href={href}
          key={key}
        />
      );

    case PROFILE_PAGE.ORGANIZATIONS:
      return (
        <SidebarLink
          title="Все организации"
          icon={<TbBuildings />}
          href={href}
          key={key}
        />
      );

    case PROFILE_PAGE.ORGANIZATION_BRIEFS:
      return (
        <SidebarLink
          title="Новые организации"
          icon={<TbBuildingCog />}
          href={href}
          key={key}
        />
      );

    case PROFILE_PAGE.USERS:
      return (
        <SidebarLink
          title="Пользователи"
          icon={<TbUsers />}
          href={href}
          key={key}
        />
      );

    case PROFILE_PAGE.ORGANIZATION_TYPES:
      return (
        <SidebarLink
          title="Типы организаций"
          icon={<TbCategory2 />}
          href={href}
          key={key}
        />
      );
  }
}

export function ProfileSidebarView({
  username,
  useravatar,
  role,
  becomeOwnerAction,
}) {
  const availableRolePages = PROFILE_PAGE_AUTHORITIES[role];

  return (
    <Flex
      direction="column"
      justify="space-between"
      left="0"
      w="64"
      h="full"
      position="absolute"
      borderWidth="1px"
      borderColor="border.muted"
      bg="bg"
    >
      <Box>
        <Center my="6" flexShrink asChild>
          <Link href="/" style={{ width: "fit" }}>
            <Image
              width="112"
              height="39"
              src="/svg/RateUs.svg"
              alt="RateUs"
              style={{
                height: "16px",
                width: "auto",
              }}
            />
          </Link>
        </Center>

        <VStack w="full" gap="1" px="1">
          {availableRolePages?.map((page, index) =>
            createSidebarLink(page, index)
          )}

          <SidebarLink
            title="Настройки"
            icon={<TbSettings />}
            href={`/profile/${PROFILE_COMMON_PAGE.SETTINGS}`}
          />

          <SidebarLink
            title="Выйти"
            icon={<PiSignOut />}
            href={"/oauth/callback/logout"}
            _hover={{ bg: "bg.error", color: "fg.error" }}
          />
        </VStack>
      </Box>

      <VStack align="start" py="5" px="3" gap="6">
        {becomeOwnerAction && (
          <Stack
            w="full"
            py="2"
            px="3"
            borderColor={`${ACCENT_COLOR}.muted`}
            borderWidth="2px"
            borderStyle="dashed"
            rounded="md"
            gap="3"
          >
            <Text
              textStyle="xs"
              textAlign="center"
              color={`${ACCENT_COLOR}.700`}
              fontWeight="medium"
            >
              Чтобы добавлять свои
              <br />
              организации станьте владельцем
            </Text>
            {becomeOwnerAction}
          </Stack>
        )}

        <Profile
          size="sm"
          username={username}
          avatarUrl={useravatar}
          role={role}
        />
      </VStack>
    </Flex>
  );
}

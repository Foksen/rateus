import { PROFILE_PAGE } from "@/constants/profile-pages";
import {
  Card,
  Center,
  Icon,
  IconButton,
  Image,
  Menu,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { TbDots, TbStarFilled } from "react-icons/tb";

function GridItemMenu({ id, ...props }) {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton
          variant="ghost"
          bg="bg"
          _hover={{ bg: "bg.muted" }}
          size="sm"
          borderWidth="1px"
          borderColor="border.muted"
          {...props}
        >
          <TbDots />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="open" cursor="pointer" asChild>
              <Link href={`/organizations/${id}`}>Открыть</Link>
            </Menu.Item>
            <Menu.Item value="edit" cursor="pointer" asChild>
              <Link
                href={`/profile/${PROFILE_PAGE.ORGANIZATIONS_SELF}/save/${id}`}
              >
                Изменить
              </Link>
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

export function OrganizationsSelfGridItem({ organization }) {
  return (
    <Card.Root overflow="hidden" cursor="default" borderColor="border.muted">
      <Image
        src={organization.photoUrl}
        alt="Organization photo"
        aspectRatio={16 / 9}
      />
      <Card.Body gap="6px" p="5">
        <Card.Title>{organization.name}</Card.Title>

        <Card.Description h="16" lineClamp="3">
          {organization.description}
        </Card.Description>

        <Stack position="absolute" top="2" left="3">
          <Center
            w="fit"
            gap="6px"
            px="2"
            py="1"
            borderWidth="1px"
            borderColor="border.muted"
            rounded="md"
            shadow="sm"
            bg={organization.onceModerated ? "green.muted" : "red.muted"}
          >
            <Text textStyle="sm" fontWeight="medium">
              {organization.onceModerated ? "Опубликовано" : "Не опубликовано"}
            </Text>
          </Center>

          <Center
            w="fit"
            gap="6px"
            px="2"
            py="1"
            borderWidth="1px"
            borderColor="border.muted"
            rounded="md"
            shadow="sm"
            bg="teal.muted"
          >
            <Text textStyle="sm" fontWeight="medium">
              {organization.organizationType}
            </Text>
          </Center>

          <Center
            w="fit"
            gap="6px"
            px="2"
            py="1"
            bg="white"
            borderWidth="1px"
            borderColor="border.muted"
            rounded="md"
            shadow="sm"
          >
            <Icon size="sm" color="yellow.400">
              <TbStarFilled />
            </Icon>
            <Text textStyle="sm" fontWeight="medium">
              {organization.avgRating || "Нет отзывов"}
            </Text>
          </Center>
        </Stack>

        <GridItemMenu
          position="absolute"
          top="2"
          right="3"
          id={organization.id}
        />
      </Card.Body>
    </Card.Root>
  );
}

import { Tooltip } from "@/components/ui/tooltip";
import { PROFILE_PAGE } from "@/constants/profile-pages";
import { pickPalette, pickRatingPalette } from "@/lib/utils/pick-palette";
import {
  Badge,
  Card,
  HStack,
  Icon,
  IconButton,
  Image,
  Menu,
  Portal,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  TbPencilCog,
  TbZoomCancelFilled,
  TbZoomCheckFilled,
} from "react-icons/tb";

function GridItemMenu({ id }) {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Icon
          color="fg.subtle"
          cursor="pointer"
          _hover={{ color: "gray.fg" }}
          transition="colors"
        >
          <TbPencilCog />
        </Icon>
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

      <Badge
        position="absolute"
        top="10px"
        left="10px"
        size="lg"
        colorPalette={pickPalette(organization.organizationType)}
        variant="surface"
        rounded="full"
      >
        {organization.organizationType}
      </Badge>

      {typeof organization.avgRating == "number" && (
        <Badge
          position="absolute"
          top="10px"
          right="10px"
          size="lg"
          colorPalette={pickRatingPalette(organization.avgRating)}
          variant="solid"
          rounded="full"
        >
          {Math.trunc(organization.avgRating * 100) / 100 || "Нет отзывов"}
        </Badge>
      )}

      <Card.Body gap="6px" p="5">
        <Card.Title>
          <HStack justify="space-between">
            <HStack gap="3">
              <Text h="fit">{organization.name}</Text>
              <GridItemMenu id={organization.id} />
            </HStack>

            <Tooltip
              ml="auto"
              content={
                organization.onceModerated ? "Опубликована" : "Не опубликована"
              }
              openDelay={750}
              closeDelay={100}
              contentProps={{
                css: {
                  "--tooltip-bg": organization.onceModerated ? "green" : "red",
                },
              }}
              positioning={{ offset: { mainAxis: 3 } }}
            >
              <Badge
                aspectRatio="1"
                colorPalette={organization.onceModerated ? "green" : "red"}
                rounded="full"
                size="md"
              >
                {organization.onceModerated ? (
                  <TbZoomCheckFilled />
                ) : (
                  <TbZoomCancelFilled />
                )}
              </Badge>
            </Tooltip>
          </HStack>
        </Card.Title>
        <Card.Description h="16" lineClamp="3">
          {organization.description}
        </Card.Description>
      </Card.Body>
    </Card.Root>
  );
}

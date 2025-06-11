import { Tooltip } from "@/components/ui/tooltip";
import { MODERATION_STATUS } from "@/constants/moderation-status";
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
import {
  TbEye,
  TbEyeCancel,
  TbEyeCheck,
  TbPencilCog,
  TbZoomCancelFilled,
  TbZoomCheckFilled,
} from "react-icons/tb";
import Link from "next/link";

const getStatusBadgeColor = (status) => {
  switch (status) {
    case MODERATION_STATUS.NEW: {
      return "blue";
    }
    case MODERATION_STATUS.APPROVED: {
      return "green";
    }
    case MODERATION_STATUS.REJECTED: {
      return "red";
    }
  }
};

const getStatusBadgeTitle = (status) => {
  switch (status) {
    case MODERATION_STATUS.NEW: {
      return "На модерации";
    }
    case MODERATION_STATUS.APPROVED: {
      return "Одобрена";
    }
    case MODERATION_STATUS.REJECTED: {
      return "Отклонена";
    }
  }
};

const getStatusBadgeIcon = (status) => {
  switch (status) {
    case MODERATION_STATUS.NEW: {
      return <TbEye />;
    }
    case MODERATION_STATUS.APPROVED: {
      return <TbEyeCheck />;
    }
    case MODERATION_STATUS.REJECTED: {
      return <TbEyeCancel />;
    }
  }
};

export function OrganizationBriefsSelfGridItem({ organizationBrief }) {
  return (
    <Link
      href={`/profile/${PROFILE_PAGE.ORGANIZATION_BRIEF}/${organizationBrief.id}`}
    >
      <Card.Root
        overflow="hidden"
        borderColor="border.muted"
        _hover={{ bg: "bg.subtle" }}
        transition="backgrounds"
      >
        <Image
          src={organizationBrief.photoUrl}
          alt="organizationBrief photo"
          aspectRatio={16 / 9}
        />

        <Badge
          position="absolute"
          top="10px"
          left="10px"
          size="lg"
          colorPalette={organizationBrief.isNew ? "green" : "blue"}
          variant="surface"
          rounded="full"
        >
          {organizationBrief.isNew ? "Создание" : "Обновление"}
        </Badge>

        <Card.Body gap="6px" p="5">
          <Card.Title>
            <HStack justify="space-between">
              <HStack gap="3">
                <Text h="fit">{organizationBrief.name}</Text>
              </HStack>

              <Tooltip
                ml="auto"
                content={getStatusBadgeTitle(organizationBrief.status)}
                openDelay={750}
                closeDelay={100}
                contentProps={{
                  css: {
                    "--tooltip-bg": getStatusBadgeColor(
                      organizationBrief.status
                    ),
                  },
                }}
                variant="surface"
                positioning={{ offset: { mainAxis: 3 } }}
              >
                <Badge
                  aspectRatio="1"
                  colorPalette={getStatusBadgeColor(organizationBrief.status)}
                  rounded="full"
                  size="md"
                >
                  {getStatusBadgeIcon(organizationBrief.status)}
                </Badge>
              </Tooltip>
            </HStack>
          </Card.Title>
          <Card.Description h="16" lineClamp="3">
            {organizationBrief.description}
          </Card.Description>
        </Card.Body>
      </Card.Root>
    </Link>
  );
}

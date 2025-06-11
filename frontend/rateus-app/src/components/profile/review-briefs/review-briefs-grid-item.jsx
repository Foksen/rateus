import { Tooltip } from "@/components/ui/tooltip";
import { MODERATION_STATUS } from "@/constants/moderation-status";
import { PROFILE_PAGE } from "@/constants/profile-pages";
import { ACCENT_COLOR, RAINBOW_AVATAR_COLORS } from "@/constants/ui";
import { pickPalette } from "@/lib/utils/pick-palette";
import {
  Avatar,
  Badge,
  Card,
  HStack,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { TbEye, TbEyeCancel, TbEyeCheck, TbStarFilled } from "react-icons/tb";

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

export function ReviewBriefsGridItem({ reviewBrief }) {
  return (
    <Link href={`/profile/${PROFILE_PAGE.REVIEW_BRIEF}/${reviewBrief.id}`}>
      <Card.Root
        borderColor="border.muted"
        _hover={{ bg: "bg.subtle" }}
        transition="backgrounds"
      >
        <Card.Body>
          <HStack justify="space-between">
            <HStack gap="4">
              <Avatar.Root
                colorPalette={
                  RAINBOW_AVATAR_COLORS ? pickPalette(username) : ACCENT_COLOR
                }
              >
                <Avatar.Fallback name={reviewBrief.authorNameSurname} />
                {reviewBrief.authorAvatarUrl != "" && (
                  <Avatar.Image src={reviewBrief.authorAvatarUrl} />
                )}
              </Avatar.Root>
              <Stack gap="0">
                <Text fontWeight="medium">{reviewBrief.authorNameSurname}</Text>
              </Stack>
            </HStack>

            <HStack>
              <Text textStyle="lg" fontWeight="medium">
                {`${reviewBrief.rating} `}
              </Text>
              <Icon size="lg" color="yellow.400">
                <TbStarFilled />
              </Icon>
            </HStack>
          </HStack>

          <Text mt="3">{reviewBrief.comment}</Text>

          <Tooltip
            ml="auto"
            content={getStatusBadgeTitle(reviewBrief.status)}
            openDelay={750}
            closeDelay={100}
            contentProps={{
              css: {
                "--tooltip-bg": getStatusBadgeColor(reviewBrief.status),
              },
            }}
            variant="surface"
            positioning={{ offset: { mainAxis: 3 } }}
          >
            <Badge
              position="absolute"
              bottom="3"
              right="3"
              aspectRatio="1"
              colorPalette={getStatusBadgeColor(reviewBrief.status)}
              rounded="full"
              size="md"
            >
              {getStatusBadgeIcon(reviewBrief.status)}
            </Badge>
          </Tooltip>
        </Card.Body>
      </Card.Root>
    </Link>
  );
}

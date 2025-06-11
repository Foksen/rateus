import { Tooltip } from "@/components/ui/tooltip";
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
import {
  TbStarFilled,
  TbZoomCancelFilled,
  TbZoomCheckFilled,
} from "react-icons/tb";

export function ReviewsGridItem({ review }) {
  return (
    <Link href={`/organizations/${review.organizationId}`}>
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
                <Avatar.Fallback name={review.authorNameSurname} />
                {review.authorAvatarUrl != "" && (
                  <Avatar.Image src={review.authorAvatarUrl} />
                )}
              </Avatar.Root>
              <Stack gap="0">
                <Text fontWeight="medium">{review.authorNameSurname}</Text>
              </Stack>
            </HStack>

            <HStack>
              <Text textStyle="lg" fontWeight="medium">
                {`${review.rating} `}
              </Text>
              <Icon size="lg" color="yellow.400">
                <TbStarFilled />
              </Icon>
            </HStack>
          </HStack>

          <Text mt="3">{review.comment}</Text>

          <Tooltip
            content={review.onceModerated ? "Опубликован" : "Не опубликован"}
            openDelay={750}
            closeDelay={100}
            contentProps={{
              css: {
                "--tooltip-bg": review.onceModerated ? "green" : "red",
              },
            }}
            positioning={{ offset: { mainAxis: 3 } }}
          >
            <Badge
              position="absolute"
              bottom="3"
              right="3"
              w="fit"
              aspectRatio="1"
              colorPalette={review.onceModerated ? "green" : "red"}
              rounded="full"
              size="md"
            >
              {review.onceModerated ? (
                <TbZoomCheckFilled />
              ) : (
                <TbZoomCancelFilled />
              )}
            </Badge>
          </Tooltip>
        </Card.Body>
      </Card.Root>
    </Link>
  );
}

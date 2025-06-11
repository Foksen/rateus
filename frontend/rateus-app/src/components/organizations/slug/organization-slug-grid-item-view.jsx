import { ACCENT_COLOR, RAINBOW_AVATAR_COLORS } from "@/constants/ui";
import { pickPalette } from "@/lib/utils/pick-palette";
import { Avatar, Card, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { TbStarFilled } from "react-icons/tb";

export function OrganizationSlugGridItemView({ review }) {
  return (
    <Card.Root>
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
      </Card.Body>
    </Card.Root>
  );
}

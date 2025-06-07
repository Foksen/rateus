import { Avatar, Card, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { TbStarFilled } from "react-icons/tb";

export function OrganizationSlugGridItemView() {
  return (
    <Card.Root>
      <Card.Body>
        <HStack justify="space-between">
          <HStack gap="4">
            <Avatar.Root>
              <Avatar.Fallback name="Антон Смирнов" />
            </Avatar.Root>
            <Stack gap="0">
              <Text fontWeight="medium">Антон Смирнов</Text>
            </Stack>
          </HStack>

          <HStack>
            <Text textStyle="lg" fontWeight="medium">
              5{" "}
            </Text>
            <Icon size="lg" color="yellow.400">
              <TbStarFilled />
            </Icon>
          </HStack>
        </HStack>

        <Text mt="3">
          Саров очень уютная гостиница! Особенно понравился завтрак и чистота в
          номере, персонал помог с трансфером — рекомендую!
        </Text>
      </Card.Body>
    </Card.Root>
  );
}

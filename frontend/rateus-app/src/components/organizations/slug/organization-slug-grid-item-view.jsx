import {
  Avatar,
  Card,
  HStack,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { TbStarFilled } from "react-icons/tb";

export function OrganizationSlugGridItemView() {
  return (
    <Card.Root>
      <Card.Body>
        <HStack justify="space-between">
          <HStack gap="4">
            <Avatar.Root>
              <Avatar.Fallback name="Matthew Jones" />
              <Avatar.Image src="https://randomuser.me/api/portraits/men/70.jpg" />
            </Avatar.Root>
            <Stack gap="0">
              <Text fontWeight="medium">Матье Бал</Text>
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
          Восприятие, несмотря на внешние воздействия, стабильно. Рельеф, в
          представлении Морено, выбирает филогенез. Действие аннигилирует
          живописный кустарничек. Кукуруза входит ассоцианизм
        </Text>
      </Card.Body>
    </Card.Root>
  );
}

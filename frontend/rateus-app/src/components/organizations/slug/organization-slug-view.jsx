import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LuExternalLink } from "react-icons/lu";
import { TbStarFilled } from "react-icons/tb";
import { OrganizationSlugGridItemView } from "./organization-slug-grid-item-view";
import { ACCENT_COLOR } from "@/constants/ui";
import { OrganizationSlugActionCreateReview } from "./orginazation-slug-action-create-review";

export function OrganizationSlugView({ session, organization }) {
  return (
    <Box maxW="8xl" mx="auto" mt="10" px="10">
      <Box
        py="10"
        px="12"
        bg="bg"
        borderWidth="1px"
        borderColor="border.muted"
        rounded="md"
      >
        {organization.websiteUrl ? (
          <Link href={organization.websiteUrl}>
            <HStack>
              <Heading size="3xl" fontWeight="bold">
                {organization.name}
              </Heading>
              <Icon ml="2" mt="1" size="md">
                <LuExternalLink />
              </Icon>
            </HStack>
          </Link>
        ) : (
          <Heading size="3xl" fontWeight="bold">
            {organization.name}
          </Heading>
        )}

        <Flex
          mt="5"
          gap="6"
          justify="space-between"
          direction={{ base: "column", xl: "row-reverse" }}
        >
          <Box
            maxW={{ xl: "xl" }}
            borderWidth="1px"
            borderColor="border.muted"
            rounded="xl"
            overflow="hidden"
          >
            <Image
              w="full"
              src={organization.photoUrl}
              alt="Фото организации"
              aspectRatio={16 / 9}
            />
          </Box>
          <Stack maxW={{ xl: "prose" }} direction="column">
            <Text>{organization.description}</Text>
            <HStack mt="4">
              <Icon size="2xl" color="yellow.400">
                <TbStarFilled />
              </Icon>
              <Heading ml="1" size="2xl">
                {organization.avgRating || "Нет отзывов"}
              </Heading>
              <Text mt="3px" ml="3" color="fg.subtle">
                11 отзывов
              </Text>
            </HStack>
          </Stack>
        </Flex>
      </Box>

      <Box
        mt="10"
        py="10"
        px="12"
        bg="bg"
        borderWidth="1px"
        borderColor="border.muted"
        rounded="md"
      >
        <HStack justify="space-between">
          <Heading size="2xl">Отзывы</Heading>

          {session ? (
            <OrganizationSlugActionCreateReview
              session={session}
              organizationId={organization.id}
            />
          ) : (
            <Link href="/auth/sign-in">
              <Button size="sm" variant="surface" colorPalette={ACCENT_COLOR}>
                Оставить отзыв
              </Button>
            </Link>
          )}
        </HStack>

        <Grid
          mt="6"
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            "2xl": "repeat(4, 1fr)",
          }}
          gap="5"
        >
          <OrganizationSlugGridItemView />
          <OrganizationSlugGridItemView />
          <OrganizationSlugGridItemView />
          <OrganizationSlugGridItemView />
          <OrganizationSlugGridItemView />
        </Grid>
      </Box>
    </Box>
  );
}

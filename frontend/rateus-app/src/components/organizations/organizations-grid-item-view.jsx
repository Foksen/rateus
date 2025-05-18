import { Card, Center, Icon, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import { TbStarFilled } from "react-icons/tb";

export function OrganizationsGridItemView({ organization }) {
  return (
    <Link href={`/organizations/${organization.id}`}>
      <Card.Root
        overflow="hidden"
        borderColor="border.muted"
        _hover={{ bg: "bg.subtle" }}
        transition="backgrounds"
      >
        <Image
          src={organization.photoUrl}
          alt="Фото огранизации"
          aspectRatio={16 / 9}
        />
        <Card.Body gap="6px" p="5">
          <Card.Title>{organization.name}</Card.Title>

          <Card.Description h="16" lineClamp="3">
            {organization.description}
          </Card.Description>

          <Center
            px="2"
            py="1"
            position="absolute"
            top="2"
            right="3"
            gap="6px"
            bg="white"
            borderWidth="1px"
            borderColor="border.muted"
            rounded="md"
            shadow="sm"
          >
            <Icon color="yellow.400">
              <TbStarFilled />
            </Icon>
            <Text fontWeight="medium">
              {organization.avgRating || "Нет отзывов"}
            </Text>
          </Center>
        </Card.Body>
      </Card.Root>
    </Link>
  );
}

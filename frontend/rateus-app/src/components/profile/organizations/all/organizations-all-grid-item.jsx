import { Tooltip } from "@/components/ui/tooltip";
import { isValidImageUrl } from "@/lib/utils/is-valid-url";
import { pickPalette, pickRatingPalette } from "@/lib/utils/pick-palette";
import { Badge, Card, HStack, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import { TbZoomCancelFilled, TbZoomCheckFilled } from "react-icons/tb";

export function OrganizationsAllGridItem({ organization }) {
  return (
    <Link href={`/organizations/${organization.id}`}>
      <Card.Root
        overflow="hidden"
        borderColor="border.muted"
        _hover={{ bg: "bg.subtle" }}
        transition="backgrounds"
      >
        <Image
          src={
            (isValidImageUrl(organization.photoUrl) && organization.photoUrl) ||
            null
          }
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
              <Text h="fit">{organization.name}</Text>

              <Tooltip
                ml="auto"
                content={
                  organization.onceModerated
                    ? "Опубликована"
                    : "Не опубликована"
                }
                openDelay={750}
                closeDelay={100}
                contentProps={{
                  css: {
                    "--tooltip-bg": organization.onceModerated
                      ? "green"
                      : "red",
                  },
                }}
                positioning={{ offset: { mainAxis: 3 } }}
              >
                <Badge
                  w="fit"
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
    </Link>
  );
}

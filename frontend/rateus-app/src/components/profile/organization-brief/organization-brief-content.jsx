"use client";

import { MODERATION_STATUS } from "@/constants/moderation-status";
import { USER_ROLE } from "@/constants/user-roles";
import { updateOrganizationBriefStatus } from "@/lib/api/organizations";
import { formatDateTime } from "@/lib/utils/date-time-format";
import { pickPalette } from "@/lib/utils/pick-palette";
import {
  Alert,
  Badge,
  Box,
  Button,
  Field,
  Fieldset,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { LuExternalLink } from "react-icons/lu";

const getAlertStatus = (briefStatus) => {
  switch (briefStatus) {
    case MODERATION_STATUS.NEW: {
      return "info";
    }
    case MODERATION_STATUS.APPROVED: {
      return "success";
    }
    case MODERATION_STATUS.REJECTED: {
      return "error";
    }
  }
};

const getAlertTitle = (briefStatus) => {
  switch (briefStatus) {
    case MODERATION_STATUS.NEW: {
      return "Заявка на модерации";
    }
    case MODERATION_STATUS.APPROVED: {
      return "Заявка одобрена";
    }
    case MODERATION_STATUS.REJECTED: {
      return "Заявка отклонена";
    }
  }
};

function OrganizationBriefView({ organizationBrief }) {
  return (
    <Fieldset.Root>
      <Fieldset.Content>
        <Field.Root>
          <Alert.Root status={getAlertStatus(organizationBrief.status)}>
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>
                {getAlertTitle(organizationBrief.status)}
              </Alert.Title>
            </Alert.Content>
          </Alert.Root>
        </Field.Root>

        <Field.Root mt="3">
          <Image
            src={organizationBrief.photoUrl}
            alt="Фото огранизации"
            aspectRatio={16 / 9}
            rounded="xl"
          />
        </Field.Root>

        <Field.Root mt="4">
          <HStack gap="5">
            <Heading>{organizationBrief.name}</Heading>

            <Badge
              mt="2px"
              size="lg"
              colorPalette={pickPalette(organizationBrief.organizationType)}
              variant="surface"
              rounded="full"
            >
              {organizationBrief.organizationType}
            </Badge>
          </HStack>
        </Field.Root>

        <Field.Root>
          <Text>{organizationBrief.description}</Text>
        </Field.Root>

        <Field.Root>
          {organizationBrief.websiteUrl ? (
            <Link href={organizationBrief.websiteUrl}>
              {organizationBrief.websiteUrl} <LuExternalLink />
            </Link>
          ) : (
            <Text>Ссылка отстутствует</Text>
          )}
        </Field.Root>

        <Field.Root mt="4">
          <HStack gap="3">
            <Text>Тип:</Text>

            <Badge
              mt="1px"
              size="lg"
              colorPalette={organizationBrief.isNew ? "green" : "blue"}
              variant="surface"
              rounded="full"
            >
              {organizationBrief.isNew ? "Новая" : "Обновлённая"}
            </Badge>
          </HStack>
        </Field.Root>

        {organizationBrief.isNew == false && (
          <Field.Root>
            <Link href={`/organizations/${organizationBrief.organizationId}`}>
              Текущая организация <LuExternalLink />
            </Link>
          </Field.Root>
        )}

        <Field.Root>
          <Text>
            Заявка создана: {formatDateTime(organizationBrief.createdAt)}
          </Text>
        </Field.Root>

        <Field.Root>
          <Text>
            Последнее обновление: {formatDateTime(organizationBrief.updatedAt)}
          </Text>
        </Field.Root>
      </Fieldset.Content>
    </Fieldset.Root>
  );
}

export function OrganizationBriefContent({ session, organizationBrief }) {
  const handleChangeStatusClick = async (status) => {
    try {
      const result = await updateOrganizationBriefStatus(
        session.token,
        organizationBrief.id,
        status
      );
      window.location.reload();
    } catch (error) {
      console.error("Failed to update organization brief status:", e);
    }
  };

  // http://localhost:3000/profile/organization-brief/d5c4e1e5-0cfb-4e53-a18f-4846b1bc6d70

  return (
    <Box mt="5">
      <OrganizationBriefView organizationBrief={organizationBrief} />

      {[USER_ROLE.MODERATOR, USER_ROLE.ADMIN, USER_ROLE.OWNER].includes(
        session.user.role
      ) &&
        organizationBrief.status === MODERATION_STATUS.NEW && (
          <Flex mt="8" gap="8" justify="end">
            <Button
              variant="surface"
              colorPalette="red"
              size="sm"
              onClick={() => handleChangeStatusClick("rejected")}
            >
              Отклонить
            </Button>

            <Button
              variant="surface"
              colorPalette="green"
              size="sm"
              onClick={() => handleChangeStatusClick("approved")}
            >
              Одобрить
            </Button>
          </Flex>
        )}
    </Box>
  );
}

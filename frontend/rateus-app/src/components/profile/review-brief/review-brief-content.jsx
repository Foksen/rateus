import { MODERATION_STATUS } from "@/constants/moderation-status";
import { ACCENT_COLOR, RAINBOW_AVATAR_COLORS } from "@/constants/ui";
import { USER_ROLE } from "@/constants/user-roles";
import { updateReviewBriefStatus } from "@/lib/api/reviews";
import { formatDateTime } from "@/lib/utils/date-time-format";
import { pickPalette } from "@/lib/utils/pick-palette";
import {
  Alert,
  Avatar,
  Badge,
  Box,
  Field,
  Fieldset,
  HStack,
  Icon,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LuExternalLink } from "react-icons/lu";
import { TbStarFilled } from "react-icons/tb";

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
      return "Отзыв на модерации";
    }
    case MODERATION_STATUS.APPROVED: {
      return "Отзыв одобрен";
    }
    case MODERATION_STATUS.REJECTED: {
      return "Отзыв отклонён";
    }
  }
};

function ReviewBriefView({ reviewBrief }) {
  return (
    <Fieldset.Root>
      <Fieldset.Content>
        <Field.Root>
          <Alert.Root status={getAlertStatus(reviewBrief.status)}>
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{getAlertTitle(reviewBrief.status)}</Alert.Title>
            </Alert.Content>
          </Alert.Root>
        </Field.Root>

        <Field.Root mt="4">
          <HStack w="full" justify="space-between">
            <HStack gap="4">
              <Avatar.Root
                colorPalette={
                  RAINBOW_AVATAR_COLORS
                    ? pickPalette(reviewBrief.authorNameSurname)
                    : ACCENT_COLOR
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
        </Field.Root>

        <Field.Root>
          <Text>{reviewBrief.comment}</Text>
        </Field.Root>

        <Field.Root mt="4">
          <HStack gap="3">
            <Text>Тип:</Text>

            <Badge
              mt="1px"
              size="lg"
              colorPalette={reviewBrief.isNew ? "green" : "blue"}
              variant="surface"
              rounded="full"
            >
              {reviewBrief.isNew ? "Создание" : "Обновление"}
            </Badge>
          </HStack>
        </Field.Root>

        <Field.Root>
          <Link href={`/organizations/${reviewBrief.organizationId}`}>
            Организация <LuExternalLink />
          </Link>
        </Field.Root>

        <Field.Root>
          <Text>Отзыв создан: {formatDateTime(reviewBrief.createdAt)}</Text>
        </Field.Root>

        <Field.Root>
          <Text>
            Последнее обновление: {formatDateTime(reviewBrief.updatedAt)}
          </Text>
        </Field.Root>
      </Fieldset.Content>
    </Fieldset.Root>
  );
}

export function ReviewBriefContent({ session, reviewBrief }) {
  const handleChangeStatusClick = async (status) => {
    try {
      const result = await updateReviewBriefStatus(
        session.token,
        reviewBrief.id,
        status
      );
      window.location.reload();
    } catch (error) {
      console.error("Failed to update review brief status:", e);
    }
  };

  return (
    <Box mt="5">
      <ReviewBriefView reviewBrief={reviewBrief} />

      {[USER_ROLE.MODERATOR, USER_ROLE.ADMIN].includes(session.user.role) &&
        reviewBrief.status === MODERATION_STATUS.NEW && (
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

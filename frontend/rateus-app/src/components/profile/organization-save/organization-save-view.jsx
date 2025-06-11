"use client";

import { PROFILE_PAGE } from "@/constants/profile-pages";
import { ACCENT_COLOR } from "@/constants/ui";
import {
  createOrganization,
  updateOrganization,
} from "@/lib/api/organizations";
import {
  Button,
  createListCollection,
  Field,
  Fieldset,
  Input,
  Portal,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

function setErrorMessages(errorMessage, setError) {
  if (errorMessage.includes("Минимальная длина названия - 16 символов")) {
    setError("name", {
      message: "Минимальная длина названия - 16 символов",
    });
  } else if (
    errorMessage.includes("Максимальная длина названия - 256 символов")
  ) {
    setError("name", {
      message: "Максимальная длина названия - 256 символов",
    });
  }

  if (errorMessage.includes("Минимальная длина описания - 30 символов")) {
    setError("description", {
      message: "Минимальная длина описания - 30 символов",
    });
  } else if (
    errorMessage.includes("Максимальная длина описания - 2000 символов")
  ) {
    setError("description", {
      message: "Максимальная длина описания - 2000 символов",
    });
  }

  if (
    errorMessage.includes("Допустимая длина названия - от 16 до 256 символов")
  ) {
    setError("name", {
      message: "Допустимая длина названия - от 16 до 256 символов",
    });
  }
  if (
    errorMessage.includes("Допустимая длина описания - от 30 до 2000 символов")
  ) {
    setError("description", {
      message: "Допустимая длина описания - от 30 до 2000 символов",
    });
  }
  if (errorMessage.includes("Некорректная ссылка на изображение")) {
    setError("photoUrl", {
      message: "Некорректная ссылка на изображение",
    });
  }
}

export function OrganizationSaveView({
  session,
  initialOrganization,
  initialOrganizationTypes,
}) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: initialOrganization
      ? {
          name: initialOrganization.name,
          description: initialOrganization.description,
          organizationTypeId: [initialOrganization.organizationTypeId],
          photoUrl: initialOrganization.photoUrl,
          websiteUrl: initialOrganization.websiteUrl,
        }
      : {},
  });

  const onSubmit = handleSubmit(async (data) => {
    const requestBody = {
      name: data.name,
      organizationTypeId: data.organizationTypeId[0],
      description: data.description,
      websiteUrl: data.websiteUrl,
      photoUrl: data.photoUrl,
    };

    console.log(requestBody);

    try {
      initialOrganization
        ? await updateOrganization(
            session.token,
            initialOrganization.id,
            requestBody
          )
        : await createOrganization(session.token, requestBody);

      router.push(`/profile/${PROFILE_PAGE.ORGANIZATION_BRIEFS_SELF}`);
    } catch (error) {
      const errorMsg = error.data.message;

      setErrorMessages(errorMsg, setError);
    }
  });

  const organizationTypes = createListCollection({
    items:
      initialOrganizationTypes?.map((item) => ({
        value: item.id,
        label: item.name,
      })) ?? [],
  });

  return (
    <form onSubmit={onSubmit}>
      <Fieldset.Root size="lg">
        <Stack>
          <Fieldset.Legend textStyle="2xl">
            {initialOrganization
              ? "Изменение организации"
              : "Создание организации"}
          </Fieldset.Legend>
          <Fieldset.HelperText textStyle="md">
            {initialOrganization
              ? "После изменения организации ей нужно будет пройти модерацию. После того как её проверит модератор, она обновится для всех пользователей"
              : "После создания организации ей нужно будет пройти модерацию. После того как её проверит модератор, она станет доступна всем пользователям"}
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Field.Root invalid={errors?.name?.message}>
            <Field.Label>Название</Field.Label>
            <Input
              placeholder="Гостиница Саров"
              {...register("name", {
                required: "Введите название",
              })}
            />
            <Field.ErrorText>{errors?.name?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={errors?.description?.message}>
            <Field.Label>Описание</Field.Label>
            <Textarea
              minH="20"
              placeholder="Небольшая уютная гостиница в Сарове"
              {...register("description", {
                required: "Введите описание",
              })}
            />
            <Field.ErrorText>{errors?.description?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root>
            <Field.Label>Тип организации</Field.Label>

            <Controller
              control={control}
              name="organizationTypeId"
              rules={{
                required: true,
              }}
              render={({ field }) => {
                return (
                  <Select.Root
                    name={field.name}
                    value={field.value}
                    onValueChange={({ value }) => field.onChange(value)}
                    onInteractOutside={() => field.onBlur()}
                    collection={organizationTypes}
                  >
                    <Select.HiddenSelect />
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText placeholder="Выберите тип организации" />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                      <Select.Positioner>
                        <Select.Content zIndex="popover">
                          {organizationTypes.items.map((organizationType) => (
                            <Select.Item
                              item={organizationType}
                              key={organizationType.value}
                            >
                              {organizationType.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>
                );
              }}
            ></Controller>
          </Field.Root>

          <Field.Root invalid={errors?.photoUrl?.message}>
            <Field.Label>Ссылка на изображение</Field.Label>
            <Input
              placeholder="https://..."
              {...register("photoUrl", {
                required: "Вставьтее ссылку на изображение",
              })}
            />
            <Field.ErrorText>{errors?.photoUrl?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root>
            <Field.Label>
              Ссылка на сайт
              <Field.RequiredIndicator
                fallback={<Text color={`${ACCENT_COLOR}.fg`}>*</Text>}
              />
            </Field.Label>
            <Input {...register("websiteUrl")} placeholder="https://..." />
          </Field.Root>

          <Button
            ml="auto"
            mt="8"
            type="submit"
            alignSelf="flex-start"
            colorPalette={`${ACCENT_COLOR}`}
            disabled={!isValid}
          >
            Отправить на модерацию
          </Button>
        </Fieldset.Content>
      </Fieldset.Root>
    </form>
  );
}

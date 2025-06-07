"use client";

import { PROFILE_PAGE } from "@/constants/profile-pages";
import { REQUEST_TYPE } from "@/constants/request-type";
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
    formState: { isValid },
  } = useForm({
    defaultValues: initialOrganization
      ? {
          name: initialOrganization.name,
          description: initialOrganization.description,
          organizationTypeId: [initialOrganization.organizationTypeId],
          photoUrl: initialOrganization.photoUrl,
          webkitURL: initialOrganization.webkitURL,
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

    {
      initialOrganization
        ? await updateOrganization(
            session.token,
            initialOrganization.id,
            requestBody,
            REQUEST_TYPE.CLIENT
          )
        : await createOrganization(
            session.token,
            requestBody,
            REQUEST_TYPE.CLIENT
          );
    }

    router.push(`/profile/${PROFILE_PAGE.ORGANIZATION_BRIEFS_SELF}`);
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
          <Field.Root>
            <Field.Label>Название</Field.Label>
            <Input
              placeholder="Гостиница Саров"
              {...register("name", {
                required: "Введите название",
              })}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Описание</Field.Label>
            <Textarea
              minH="20"
              placeholder="Небольшая уютная гостиница в Сарове"
              {...register("description", {
                required: "Введите описание",
              })}
            />
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

          <Field.Root>
            <Field.Label>Ссылка на изображение</Field.Label>
            <Input
              placeholder="https://..."
              {...register("photoUrl", {
                required: "Вставьтее ссылку на изображение",
              })}
            />
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

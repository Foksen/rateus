import {
  Avatar,
  Button,
  createListCollection,
  Dialog,
  Field,
  Fieldset,
  HStack,
  Input,
  Portal,
  Select,
  Switch,
  Text,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { useRef, useEffect } from "react";
import { mapRoleName, USER_ROLE } from "@/constants/user-roles";
import { patchUser } from "@/lib/api/user";
import { ACCENT_COLOR, RAINBOW_AVATAR_COLORS } from "@/constants/ui";
import { formatDateTimeStrict } from "@/lib/utils/date-time-format";
import { pickPalette } from "@/lib/utils/pick-palette";
import { PasswordInput } from "@/components/ui/password-input";

const rolesList = createListCollection({
  items: Object.values(USER_ROLE).map((role) => ({
    value: role,
    label: mapRoleName(role),
  })),
});

export function UsersDialogEdit({
  isEditDialogOpen,
  setEditDialogOpen,
  user,
  updateUser,
  session,
}) {
  const headerRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    formState: { isValid, errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues:
      (user && {
        name: user.name,
        surname: user.surname,
        email: user.email,
        avatarUrl: user.avatarUrl,
        isBlocked: user.isBlocked,
        userRole: [user.userRole],
      }) ||
      {},
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        surname: user.surname,
        email: user.email,
        avatarUrl: user.avatarUrl,
        isBlocked: user.isBlocked,
        userRole: [user.userRole],
      });
    }
  }, [user, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await patchUser(session.token, user.id, {
        name: data.name,
        surname: data.surname,
        email: data.email,
        avatarUrl: data.avatarUrl,
        isBlocked: data.isBlocked,
        userRole: data.userRole[0],
        password: data.password,
      });
      updateUser(response.id, {
        id: response.id,
        name: response.name,
        surname: response.surname,
        email: response.email,
        avatarUrl: response.avatarUrl,
        isBlocked: response.isBlocked,
        userRole: response.userRole,
      });
      setEditDialogOpen(false);
      reset();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog.Root
      lazyMount
      open={isEditDialogOpen}
      onOpenChange={(e) => setEditDialogOpen(e.open)}
      initialFocusEl={() => headerRef.current}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content as="form" onSubmit={onSubmit}>
            <Dialog.Header ref={headerRef} tabIndex="-1" outline="none">
              <Dialog.Title textStyle="2xl">Изменить пользователя</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Fieldset.Root>
                <Fieldset.Content gap="6">
                  <Field.Root>
                    <Field.Label>Идентификатор</Field.Label>
                    <Text mt="2">{user?.id}</Text>
                  </Field.Root>

                  <HStack gap="8">
                    <Field.Root>
                      <Field.Label>Имя</Field.Label>
                      <Input
                        {...register("name", {
                          required: "Введите имя",
                        })}
                        placeholder="Сергей"
                      />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>Фамилия</Field.Label>
                      <Input
                        {...register("surname", {
                          required: "Введите фамилию",
                        })}
                        placeholder="Иванов"
                      />
                    </Field.Root>
                  </HStack>

                  <Field.Root>
                    <Field.Label>Почта</Field.Label>
                    <Input
                      {...register("email", {
                        required: "Введите почту",
                      })}
                      placeholder="email@example.com"
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Пароль</Field.Label>
                    <PasswordInput
                      {...register("password", {})}
                      placeholder={
                        user?.userProvider === "YANDEX"
                          ? "Нельзя изменить"
                          : "Оставьте пустым, если не хотите менять"
                      }
                      disabled={user?.userProvider === "YANDEX" ? true : null}
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Аватар</Field.Label>

                    <HStack mt="2" w="full" gap="4">
                      <Avatar.Root
                        colorPalette={
                          RAINBOW_AVATAR_COLORS
                            ? pickPalette(`${user?.surname} ${user?.name}`)
                            : ACCENT_COLOR
                        }
                      >
                        <Avatar.Fallback
                          name={`${user?.surname} ${user?.name}`}
                        />
                        {user?.avatarUrl != "" && (
                          <Avatar.Image src={user?.avatarUrl} />
                        )}
                      </Avatar.Root>

                      <Input
                        w="full"
                        {...register("avatarUrl")}
                        placeholder="https://..."
                      />
                    </HStack>
                  </Field.Root>

                  <HStack gap="8">
                    <Field.Root>
                      <Field.Label>Роль</Field.Label>

                      <Controller
                        control={control}
                        name="userRole"
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => {
                          return (
                            <Select.Root
                              name={field.name}
                              value={field.value}
                              onValueChange={({ value }) =>
                                field.onChange(value)
                              }
                              onInteractOutside={() => field.onBlur()}
                              collection={rolesList}
                            >
                              <Select.HiddenSelect />
                              <Select.Control>
                                <Select.Trigger>
                                  <Select.ValueText />
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                  <Select.Indicator />
                                </Select.IndicatorGroup>
                              </Select.Control>
                              <Portal>
                                <Select.Positioner>
                                  <Select.Content zIndex="popover">
                                    {rolesList?.items?.map((role) => (
                                      <Select.Item item={role} key={role.value}>
                                        {role.label}
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
                      <Field.Label>Сервис</Field.Label>
                      <Text mt="2">{user?.userProvider}</Text>
                    </Field.Root>
                  </HStack>

                  <Controller
                    name="isBlocked"
                    control={control}
                    render={({ field }) => (
                      <Field.Root my="2">
                        <Switch.Root
                          name={field.name}
                          checked={field.value}
                          onCheckedChange={({ checked }) =>
                            field.onChange(checked)
                          }
                          gap="4"
                          colorPalette={ACCENT_COLOR}
                        >
                          <Switch.HiddenInput onBlur={field.onBlur} />
                          <Switch.Control />
                          <Switch.Label>Заблокирован</Switch.Label>
                        </Switch.Root>
                      </Field.Root>
                    )}
                  />

                  <HStack gap="8">
                    <Field.Root>
                      <Field.Label>Создан</Field.Label>
                      <Text mt="2">
                        {formatDateTimeStrict(user?.createdAt)}
                      </Text>
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>Последнее изменение</Field.Label>
                      <Text mt="2">
                        {formatDateTimeStrict(user?.updatedAt)}
                      </Text>
                    </Field.Root>
                  </HStack>
                </Fieldset.Content>
              </Fieldset.Root>
            </Dialog.Body>
            <Dialog.Footer pb="8">
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={() => reset()}>
                  Отменить
                </Button>
              </Dialog.ActionTrigger>
              <Button
                type="submit"
                colorPalette={ACCENT_COLOR}
                disabled={!isValid}
              >
                Изменить
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

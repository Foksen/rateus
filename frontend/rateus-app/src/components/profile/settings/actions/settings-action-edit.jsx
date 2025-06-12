"use client";

import {
  Alert,
  Avatar,
  Button,
  createListCollection,
  Dialog,
  Field,
  Fieldset,
  HStack,
  Input,
  Portal,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRef, useEffect } from "react";
import { mapRoleName, USER_ROLE } from "@/constants/user-roles";
import { patchUser } from "@/lib/api/user";
import { ACCENT_COLOR, RAINBOW_AVATAR_COLORS } from "@/constants/ui";
import { pickPalette } from "@/lib/utils/pick-palette";
import { PasswordInput } from "@/components/ui/password-input";
import { useRouter } from "next/navigation";

const rolesList = createListCollection({
  items: Object.values(USER_ROLE).map((role) => ({
    value: role,
    label: mapRoleName(role),
  })),
});

export function SettingsActionEdit({ user, session }) {
  const headerRef = useRef(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isValid, errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues:
      (user && {
        name: user.name,
        surname: user.surname,
        email: user.email,
        avatarUrl: user.avatarUrl,
        password: null,
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
        password: null,
      });
    }
  }, [user, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await patchUser(session.token, user.id, {
        name: data.name,
        surname: data.surname,
        email: user?.userProvider === "YANDEX" ? null : data.email,
        avatarUrl: data.avatarUrl,
        password: user?.userProvider === "YANDEX" ? null : data.password,
        password:
          user?.userProvider === "YANDEX" || !data.password
            ? null
            : data.password,
      });
      router.push("/oauth/callback/logout?redirect=/auth/sign-in");
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog.Root initialFocusEl={() => headerRef.current}>
      <Dialog.Trigger asChild>
        <Button
          w="fit"
          colorPalette={ACCENT_COLOR}
          variant="surface"
          alignSelf="end"
        >
          Изменить настройки
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content as="form" onSubmit={onSubmit}>
            <Dialog.Header ref={headerRef} tabIndex="-1" pb="2" outline="none">
              <Dialog.Title textStyle="2xl">Изменение настроек</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Alert.Root status="info" colorPalette={ACCENT_COLOR}>
                <Alert.Indicator />
                <Alert.Title>Будет необходимо перезайти в аккаунт</Alert.Title>
              </Alert.Root>

              <Fieldset.Root mt="4">
                <Fieldset.Content gap="6">
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
                      disabled={user?.userProvider === "YANDEX" ? true : null}
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
                </Fieldset.Content>
              </Fieldset.Root>
            </Dialog.Body>
            <Dialog.Footer pb="8">
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={() => reset()}>
                  Отменить
                </Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button
                  type="submit"
                  colorPalette={ACCENT_COLOR}
                  disabled={!isValid}
                >
                  Изменить
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

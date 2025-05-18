"use client";

import {
  Button,
  ButtonGroup,
  Field,
  Fieldset,
  Heading,
  Input,
  Link as ChakraLink,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";
import { PasswordInput } from "../ui/password-input";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { yandexOAuthRedirect } from "@/lib/api/yandex";
import { mapSignInErrors } from "@/lib/utils/map-errors";

export function SignInForm({}) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { isValid, errors },
  } = useForm({ mode: "onSubmit" });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    const params = {
      redirect: false,
      email: data.email,
      password: data.password,
    };

    const response = await signIn("credentials", { ...params });
    if (response.ok) {
      router.push("/");
    } else {
      setIsLoading(false);
      const errorData = JSON.parse(decodeURIComponent(response.error)).data;
      const errorMessage = mapSignInErrors(errorData?.message).global;
      setError("root", {
        message: errorMessage,
      });
    }

    setIsLoading(false);
  });

  const rootError = errors?.root?.message;

  return (
    <VStack
      w="lg"
      mb="6"
      as="form"
      bg="bg"
      p="14"
      rounded="md"
      borderWidth="1px"
      borderColor="border.muted"
      onSubmit={onSubmit}
    >
      <Heading size="3xl" mb="3">
        Вход
      </Heading>
      <Fieldset.Root invalid={rootError}>
        <Fieldset.Content>
          <Field.Root>
            <Field.Label>Почта</Field.Label>
            <Input
              type="email"
              placeholder="email@example.com"
              {...register("email", {
                required: "Введите почту",
              })}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Пароль</Field.Label>
            <PasswordInput
              placeholder="qwerty123"
              {...register("password", {
                required: "Введите пароль",
              })}
            />
          </Field.Root>

          <Button
            mt="8"
            type="submit"
            disabled={!isValid}
            loading={isLoading}
            loadingText="Войти"
          >
            Войти
          </Button>
        </Fieldset.Content>

        <Fieldset.ErrorText alignSelf="center">{rootError}</Fieldset.ErrorText>
      </Fieldset.Root>

      <Text mt="4" fontWeight="medium" textStyle="sm" alignSelf="center">
        Ещё нет аккаунта?&nbsp;
        <ChakraLink variant="underline" outline="none" asChild>
          <Link href="/auth/sign-up">Зарегистрироваться</Link>
        </ChakraLink>
      </Text>

      <Separator my="4" w="full" />

      <ButtonGroup w="full" grow>
        {/* <Button variant="subtle" onClick={null}>
          <FcGoogle />
          Войти через Google
        </Button> */}

        <Button variant="subtle" onClick={yandexOAuthRedirect}>
          <Image
            alt="yandex"
            width="20"
            height="20"
            src="/svg/YandexIcon.svg"
          />
          Войти через Яндекс
        </Button>
      </ButtonGroup>
    </VStack>
  );
}

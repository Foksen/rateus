"use client";

import {
  Button,
  Field,
  Fieldset,
  Heading,
  Input,
  Link as ChakraLink,
  Text,
  VStack,
} from "@chakra-ui/react";
import { PasswordInput } from "../ui/password-input";
import { ACCENT_COLOR } from "@/constants/ui";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { registerUserWithEmail } from "@/lib/api/back-auth";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { mapSignUpErrors } from "@/lib/utils/map-errors";

export function SignUpForm({}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isValid, errors },
  } = useForm({ mode: "onSubmit" });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    if (data.repeatedPassword != data.password) {
      setError("repeatedPassword", {
        message: "Пароли не совпадают",
      });
      return;
    }

    try {
      const response = await registerUserWithEmail({
        name: data.name,
        surname: data.surname,
        email: data.email,
        password: data.password,
      });
      const token = response.token;
      if (token) {
        await signIn("credentials", {
          token: response.token,
          redirect: false,
        });
        window.location.href = "/";
      } else {
        throw Error("No token in sign-up response");
      }
    } catch (error) {
      setIsLoading(false);
      const errorResponse = mapSignUpErrors(error?.data?.message);
      const errorEmailResponse = errorResponse.email;
      const errorRootResponse = errorResponse.root;

      if (errorEmailResponse) {
        setError("email", {
          message: errorEmailResponse,
        });
      }

      if (errorRootResponse) {
        setError("root", {
          message: errorRootResponse,
        });
      }
    }
    setIsLoading(false);
  });

  const emailError = errors?.email?.message;
  const repeatedPasswordError = errors?.repeatedPassword?.message;
  const rootError = errors?.root?.message;

  return (
    <VStack
      w="lg"
      as="form"
      bg="bg"
      p="14"
      rounded="md"
      borderWidth="1px"
      borderColor="border.muted"
      onSubmit={onSubmit}
    >
      <Heading size="3xl" mb="3">
        Регистрация
      </Heading>

      <Fieldset.Root mt="2" invalid={rootError}>
        <Fieldset.Content>
          <Field.Root>
            <Field.Label>Ваше имя</Field.Label>
            <Input
              placeholder="Сергей"
              {...register("name", {
                required: "Введите имя",
              })}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Ваша фамилия</Field.Label>
            <Input
              placeholder="Сергей"
              {...register("surname", {
                required: "Введите фамилию",
              })}
            />
          </Field.Root>

          <Field.Root invalid={emailError}>
            <Field.Label>Почта</Field.Label>
            <Input
              type="email"
              placeholder="email@example.com"
              {...register("email", {
                required: "Введите почту",
              })}
            />
            <Field.ErrorText>{emailError}</Field.ErrorText>
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

          <Field.Root invalid={repeatedPasswordError}>
            <Field.Label>Повторите пароль</Field.Label>
            <PasswordInput
              placeholder="qwerty123"
              {...register("repeatedPassword", {
                required: "Повторите пароль",
              })}
            />
            <Field.ErrorText>{repeatedPasswordError}</Field.ErrorText>
          </Field.Root>
        </Fieldset.Content>

        <Button
          mt="8"
          type="submit"
          disabled={!isValid}
          loading={isLoading}
          loadingText="Зарегистрироваться"
        >
          Зарегистрироваться
        </Button>

        <Fieldset.ErrorText alignSelf="center">{rootError}</Fieldset.ErrorText>
      </Fieldset.Root>

      <Text mt="4" fontWeight="medium" textStyle="sm" alignSelf="center">
        Уже есть аккаунт?&nbsp;
        <ChakraLink variant="underline" outline="none" asChild>
          <Link href="/auth/sign-in">Зарегистрироваться</Link>
        </ChakraLink>
      </Text>
    </VStack>
  );
}

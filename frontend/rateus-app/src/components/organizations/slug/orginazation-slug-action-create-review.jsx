"use client";

import { ACCENT_COLOR } from "@/constants/ui";
import { createReview } from "@/lib/api/tasks";
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  DialogActionTrigger,
  Field,
  Fieldset,
  HStack,
  Icon,
  Portal,
  RadioCard,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { TbStarFilled } from "react-icons/tb";

function SuccessDialog({ setIsSucess }) {
  return (
    <Dialog.Root
      size="sm"
      defaultOpen="true"
      onOpenChange={(openDetails) => {
        if (openDetails.open == false) {
          setIsSucess(false);
        }
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content p="2">
            <Dialog.Header>
              <Stack gap="3">
                <Dialog.Title textStyle="2xl">Отзыв оставлен</Dialog.Title>
                <Text>
                  Ваш отзыв будет опубликован после того как пройдёт модерацию.
                  Спасибо, что поделились своим мнением!
                </Text>
              </Stack>
            </Dialog.Header>
            <Dialog.Footer pt="4" pb="6">
              <Dialog.ActionTrigger asChild>
                <Button colorPalette={ACCENT_COLOR} outline="none">
                  Хорошо
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

function RadioCardRatingItem({ number }) {
  return (
    <RadioCard.Item transition="backgrounds" value={number}>
      <RadioCard.ItemHiddenInput />
      <RadioCard.ItemControl gap="1" cursor="pointer">
        <Icon size="md" color="yellow.400" mt="1px">
          <TbStarFilled />
        </Icon>
        <RadioCard.ItemText maxW="5" fontSize="lg">
          {number}
        </RadioCard.ItemText>
      </RadioCard.ItemControl>
    </RadioCard.Item>
  );
}

export function OrganizationSlugActionCreateReview({
  session,
  organizationId,
}) {
  const headerRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const [isSuccess, setIsSucess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isValid },
  } = useForm({ defaultValues: { organizationId: organizationId } });

  const onSubmit = handleSubmit(async (data) => {
    await createReview(session.token, data);
    setIsOpen(false);
    reset();
    setIsSucess(true);
  });

  return (
    <Box>
      <Dialog.Root
        lazyMount
        open={isOpen}
        onOpenChange={(e) => setIsOpen(e.open)}
        initialFocusEl={() => headerRef.current}
      >
        <Dialog.Trigger asChild>
          <Button size="sm" variant="surface" colorPalette={ACCENT_COLOR}>
            Оставить отзыв
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content as="form" onSubmit={onSubmit} p="2">
              <Dialog.Header ref={headerRef} tabIndex="-1" outline="none">
                <Stack gap="3">
                  <Dialog.Title textStyle="2xl">Оставить отзыв</Dialog.Title>
                  <Text>
                    Прежде чем отзыв будет опубликован и станет виден другим
                    пользователям и будет учитываться при рассчёте рейтинга, он
                    должен будет пройти обязательную проверку от администрации
                    сайта
                  </Text>
                </Stack>
              </Dialog.Header>
              <Dialog.Body>
                <Fieldset.Root>
                  <Fieldset.Content>
                    <Controller
                      name="rating"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <RadioCard.Root
                          orientation="horizontal"
                          align="center"
                          justify="center"
                          variant="surface"
                          colorPalette={ACCENT_COLOR}
                          onValueChange={({ value }) => {
                            field.onChange(value);
                          }}
                        >
                          <RadioCard.Label>Оценка</RadioCard.Label>
                          <HStack>
                            <RadioCardRatingItem number={1} />
                            <RadioCardRatingItem number={2} />
                            <RadioCardRatingItem number={3} />
                            <RadioCardRatingItem number={4} />
                            <RadioCardRatingItem number={5} />
                          </HStack>
                        </RadioCard.Root>
                      )}
                    ></Controller>

                    <Field.Root invalid={null}>
                      <Field.Label>Комментарий</Field.Label>
                      <Textarea
                        minH="28"
                        placeholder="Мне понравилось это, но не понравилось то..."
                        borderColor="border"
                        outline="none"
                        {...register("comment", {
                          required: "Введите название",
                        })}
                      />
                      <Field.ErrorText>{null}</Field.ErrorText>
                    </Field.Root>
                  </Fieldset.Content>
                </Fieldset.Root>
              </Dialog.Body>
              <Dialog.Footer pt="4" pb="6">
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Отменить</Button>
                </Dialog.ActionTrigger>
                <Button
                  type="submit"
                  colorPalette={ACCENT_COLOR}
                  disabled={!isValid}
                >
                  Отправить
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      {isSuccess && <SuccessDialog setIsSucess={setIsSucess} />}
    </Box>
  );
}

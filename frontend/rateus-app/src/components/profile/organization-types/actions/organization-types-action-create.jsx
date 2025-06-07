import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Fieldset,
  Input,
  Portal,
  Switch,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { mapOrganizationTypeError } from "@/lib/utils/map-errors";
import { ACCENT_COLOR } from "@/constants/ui";
import { createOrganizationType } from "@/lib/api/organizations";
import { REQUEST_TYPE } from "@/constants/request-type";

export function OrganizationTypesActionCreate({
  session,
  addOrganizationType,
}) {
  const headerRef = useRef(null);

  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    formState: { isValid, errors },
  } = useForm({ mode: "onSubmit", defaultValues: { isAvailable: true } });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await createOrganizationType(session.token, {
        name: data.name,
        isAvailable: data.isAvailable,
      }, REQUEST_TYPE.CLIENT);
      addOrganizationType({
        id: response.id,
        name: response.name,
        isAvailable: response.isAvailable,
      });
      setOpen(false);
      reset();
    } catch (error) {
      const responseNameError = mapOrganizationTypeError(
        error?.data?.message
      ).name;
      if (responseNameError) {
        setError("name", {
          message: responseNameError,
        });
      } else {
        console.log(error);
      }
    }
  });

  const nameError = errors?.name?.message;

  return (
    <Dialog.Root
      initialFocusEl={() => headerRef.current}
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Dialog.Trigger asChild>
        <Button colorPalette={ACCENT_COLOR} size="sm" variant="surface">
          Создать тип организации
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content as="form" onSubmit={onSubmit} p="2">
            <Dialog.Header ref={headerRef} tabIndex="-1" outline="none">
              <Dialog.Title textStyle="2xl">
                Создание типа организации
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Fieldset.Root>
                <Fieldset.Content gap="6">
                  <Field.Root invalid={nameError}>
                    <Field.Label>Название</Field.Label>
                    <Input
                      {...register("name", {
                        required: "Введите название",
                      })}
                      placeholder="Гостиница"
                    />
                    <Field.ErrorText>{nameError}</Field.ErrorText>
                  </Field.Root>

                  <Controller
                    name="isAvailable"
                    control={control}
                    render={({ field }) => (
                      <Field.Root>
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
                          <Switch.Label>Доступен</Switch.Label>
                        </Switch.Root>
                      </Field.Root>
                    )}
                  />
                </Fieldset.Content>
              </Fieldset.Root>
            </Dialog.Body>
            <Dialog.Footer pt="4" pb="6">
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
                Создать
              </Button>
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

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
import { useEffect, useRef } from "react";
import { mapOrganizationTypeError } from "@/lib/utils/map-errors";
import { ACCENT_COLOR } from "@/constants/ui";
import { createOrganizationType } from "@/lib/api/organizations";
import { REQUEST_TYPE } from "@/constants/request-type";

export function OrganizationTypesDialogEdit({
  isEditDialogOpen,
  setEditDialogOpen,
  organizationType,
  updateOrganizationType,
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
      (organizationType && {
        name: organizationType.name,
        isAvailable: organizationType.isAvailable,
      }) ||
      {},
  });

  useEffect(() => {
    if (organizationType) {
      reset({
        name: organizationType.name,
        isAvailable: organizationType.isAvailable,
      });
    }
  }, [organizationType, reset]);

  const nameError = errors?.name?.message;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await createOrganizationType(
        session.token,
        {
          id: organizationType.id,
          name: data.name,
          isAvailable: data.isAvailable,
        },
        REQUEST_TYPE.CLIENT
      );
      updateOrganizationType(response.id, response);
      setEditDialogOpen(false);
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
          <Dialog.Content as="form" onSubmit={onSubmit} p="2">
            <Dialog.Header ref={headerRef} tabIndex="-1" outline="none">
              <Dialog.Title textStyle="2xl">Изменить вид ремонта</Dialog.Title>
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
                Изменить
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

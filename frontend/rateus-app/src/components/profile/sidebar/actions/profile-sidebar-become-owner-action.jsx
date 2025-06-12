import { PasswordInput } from "@/components/ui/password-input";
import { ACCENT_COLOR } from "@/constants/ui";
import {
  Alert,
  Button,
  CloseButton,
  Dialog,
  Field,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

export const BecomeOwnerAction = ({ onSubmit }) => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const headerRef = useRef(null);

  return (
    <Dialog.Root initialFocusEl={() => headerRef.current}>
      <Dialog.Trigger asChild>
        <Button size="xs" variant="surface" colorPalette={ACCENT_COLOR}>
          Стать владельцем
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content p="2">
            <Dialog.Header pb="3" ref={headerRef} tabIndex="-1" outline="none">
              <Dialog.Title textStyle="2xl">
                Стать владельцем организации
              </Dialog.Title>
            </Dialog.Header>

            <Dialog.Body pt="0" pb="2">
              <Stack>
                <Text>
                  Когда вы нажмёте на кнопку "Стать владельцем организации" у
                  вас откроется новый функционал для управления организациями
                </Text>
                <Text>
                  У вас останется возможность смотреть свои старые отзывы и
                  оставлять новые. Учтите, что это действие невозможно отменить
                </Text>
              </Stack>
              <Alert.Root mt="5" status="info" colorPalette={ACCENT_COLOR}>
                <Alert.Indicator />
                <Alert.Title>Будет необходимо перезайти в аккаунт</Alert.Title>
              </Alert.Root>
            </Dialog.Body>

            <Dialog.Footer pb="8" pt="4" pb="6">
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Отменить</Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button
                  colorPalette={ACCENT_COLOR}
                  loading={isSubmitLoading}
                  loadingText="Стать владельцем"
                  onClick={() => {
                    setIsSubmitLoading(true);
                    try {
                      onSubmit();
                    } catch {
                      setIsSubmitLoading(false);
                    }
                  }}
                >
                  Стать владельцем
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
};

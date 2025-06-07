import { REQUEST_TYPE } from "@/constants/request-type";
import { deleteOrganizationType } from "@/lib/api/organizations";
import { Button, CloseButton, Dialog, Portal, Text } from "@chakra-ui/react";
import { useRef } from "react";

export function OrganizationTypesDialogDelete({
  isDeleteDialogOpen,
  setDeleteDialogOpen,
  organizationType,
  removeOrganizationType,
  session,
}) {
  const headerRef = useRef(null);

  const handleDeleteClick = async () => {
    try {
      const result = await deleteOrganizationType(
        session.token,
        organizationType.id,
        REQUEST_TYPE.CLIENT
      );
      removeOrganizationType(organizationType.id);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog.Root
      role="alertdialog"
      lazyMount
      open={isDeleteDialogOpen}
      onOpenChange={(e) => setDeleteDialogOpen(e.open)}
      initialFocusEl={() => headerRef.current}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content p="2">
            <Dialog.Header pb="3" ref={headerRef} tabIndex="-1" outline="none">
              <Dialog.Title textStyle="2xl">
                Удаление типа организации
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pt="0" pb="2">
              <Text>
                Вы уверены, что хотите удалить тип организации "
                {organizationType?.name}
                "? Все организации и заявки к ним будут также удалены. После
                удаления его будет невозможно восстановить
              </Text>
            </Dialog.Body>
            <Dialog.Footer pt="4" pb="6">
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Отменить</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red" onClick={handleDeleteClick}>
                Удалить
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

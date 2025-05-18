import { Badge, Box, IconButton, Menu, Portal, Table } from "@chakra-ui/react";
import { TbDots } from "react-icons/tb";
import { useState } from "react";
import { OrganizationTypesDialogEdit } from "./dialogs/organization-types-dialog-edit";
import { OrganizationTypesDialogDelete } from "./dialogs/organization-types-dialog-delete";

const OrganizationTypesStatusBadge = (isAvailable) => {
  const label = isAvailable ? "Доступен" : "Недоступен";
  const colorPalette = isAvailable ? "green" : "red";

  return (
    <Badge size="lg" colorPalette={colorPalette}>
      {label}
    </Badge>
  );
};

const OrganizationTypeInfoMenu = ({
  organizationType,
  setEditDialogOpen,
  setDeleteDialogOpen,
  setSelectedOrganizationType,
}) => (
  <Menu.Root>
    <Menu.Trigger asChild>
      <IconButton variant="ghost" size="sm">
        <TbDots />
      </IconButton>
    </Menu.Trigger>
    <Portal>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item
            value="edit"
            cursor="pointer"
            onClick={() => {
              setSelectedOrganizationType(organizationType);
              setEditDialogOpen(true);
            }}
          >
            Изменить
          </Menu.Item>
          <Menu.Item
            value="delete"
            cursor="pointer"
            color="fg.error"
            _hover={{ bg: "bg.error", color: "fg.error" }}
            onClick={() => {
              setSelectedOrganizationType(organizationType);
              setDeleteDialogOpen(true);
            }}
          >
            Удалить
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>
);

export function OrganizationTypesTable({
  session,
  organizationTypes,
  updateOrganizationType,
  removeOrganizationType,
}) {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedOrganizationType, setSelectedOrganizationType] =
    useState(null);

  return (
    <Box mt="5">
      <Table.Root size="lg">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader
              fontWeight="normal"
              color="fg.subtle"
              border="none"
              w="20"
            >
              Id
            </Table.ColumnHeader>
            <Table.ColumnHeader
              fontWeight="normal"
              color="fg.subtle"
              border="none"
            >
              Название
            </Table.ColumnHeader>
            <Table.ColumnHeader
              fontWeight="normal"
              color="fg.subtle"
              border="none"
              w="36"
            >
              Статус
            </Table.ColumnHeader>
            <Table.ColumnHeader border="none" w="12"></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {organizationTypes.map((organizationType, index) => (
            <Table.Row key={index} h="16">
              <Table.Cell
                borderTopWidth="1px"
                borderBottomWidth="0"
                borderColor="border.muted"
              >
                {organizationType.id}
              </Table.Cell>
              <Table.Cell
                borderTopWidth="1px"
                borderBottomWidth="0"
                borderColor="border.muted"
                fontWeight="medium"
              >
                {organizationType.name}
              </Table.Cell>
              <Table.Cell
                borderTopWidth="1px"
                borderBottomWidth="0"
                borderColor="border.muted"
              >
                {OrganizationTypesStatusBadge(organizationType.isAvailable)}
              </Table.Cell>
              <Table.Cell
                borderTopWidth="1px"
                borderBottomWidth="0"
                borderColor="border.muted"
              >
                <OrganizationTypeInfoMenu
                  organizationType={organizationType}
                  setEditDialogOpen={setEditDialogOpen}
                  setDeleteDialogOpen={setDeleteDialogOpen}
                  setSelectedOrganizationType={setSelectedOrganizationType}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <OrganizationTypesDialogEdit
        isEditDialogOpen={isEditDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
        organizationType={selectedOrganizationType}
        updateOrganizationType={updateOrganizationType}
        session={session}
      />

      <OrganizationTypesDialogDelete
        isDeleteDialogOpen={isDeleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        organizationType={selectedOrganizationType}
        removeOrganizationType={removeOrganizationType}
        session={session}
      />
    </Box>
  );
}

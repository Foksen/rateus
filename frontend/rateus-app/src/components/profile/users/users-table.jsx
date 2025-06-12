"use client";

import { mapRoleName, USER_ROLE } from "@/constants/user-roles";
import { Badge, Box, IconButton, Menu, Portal, Table } from "@chakra-ui/react";
import { TbCrown, TbDots, TbEyeglass } from "react-icons/tb";
import { useState } from "react";
import { UsersDialogEdit } from "./dialogs/users-dialog-edit";
import { UsersDialogDelete } from "./dialogs/users-dialog-delete";
import Image from "next/image";

function mapUserRoleColor(role) {
  switch (role) {
    case USER_ROLE.USER:
      return "gray";
    case USER_ROLE.OWNER:
      return "blue";
    case USER_ROLE.MODERATOR:
      return "orange";
    case USER_ROLE.ADMIN:
      return "pink";
    default:
      return "purple";
  }
}

function mapUserRoleIcon(role) {
  switch (role) {
    case USER_ROLE.MODERATOR:
      return <TbEyeglass />;
    case USER_ROLE.ADMIN:
      return <TbCrown />;
    default:
      return null;
  }
}

function UserRoleBadge({ role }) {
  return (
    <Badge size="lg" gap="6px" colorPalette={mapUserRoleColor(role)}>
      {mapUserRoleIcon(role)}
      {mapRoleName(role)}
    </Badge>
  );
}

function UserProviderIcon({ provider }) {
  switch (provider) {
    case "EMAIL": {
      return (
        <Image
          width="66"
          height="20"
          src="/svg/RateUs.svg"
          alt="RateUs"
          style={{
            height: "12px",
            width: "auto",
            margin: "auto",
          }}
        />
      );
    }
    case "YANDEX": {
      return (
        <Image
          alt="yandex"
          width="24"
          height="24"
          src="/svg/YandexIcon.svg"
          style={{ margin: "auto" }}
        />
      );
    }
  }
}

function UserStatusBadge({ isBlocked }) {
  return (
    <Badge size="lg" gap="6px" colorPalette={isBlocked ? "red" : "green"}>
      {isBlocked ? "Забанен" : "Активен"}
    </Badge>
  );
}

const UserMenu = ({
  user,
  setEditDialogOpen,
  setDeleteDialogOpen,
  setSelectedUser,
}) => (
  <Menu.Root>
    <Menu.Trigger asChild>
      <IconButton variant="ghost" size="sm" outline="none">
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
              setSelectedUser(user);
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
              setSelectedUser(user);
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

export function UsersTable({ initialUsers, session }) {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const updateUser = (id, newUser) => {
    setUsers((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, ...newUser } : cat))
    );
  };

  const removeUser = (id) => {
    setUsers((prev) => prev.filter((cat) => cat.id !== id));
  };

  return (
    <Box mt="6">
      <Table.Root size="lg">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader
              fontWeight="normal"
              color="fg.subtle"
              border="none"
            >
              Имя и фамилия
            </Table.ColumnHeader>
            <Table.ColumnHeader
              fontWeight="normal"
              color="fg.subtle"
              border="none"
            >
              Почта
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              fontWeight="normal"
              color="fg.subtle"
              border="none"
            >
              Роль
            </Table.ColumnHeader>

            <Table.ColumnHeader
              textAlign="center"
              fontWeight="normal"
              color="fg.subtle"
              border="none"
            >
              Сервис
            </Table.ColumnHeader>

            <Table.ColumnHeader
              textAlign="center"
              fontWeight="normal"
              color="fg.subtle"
              border="none"
            >
              Статус
            </Table.ColumnHeader>

            <Table.ColumnHeader border="none" w="12"></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users?.map((user) => (
            <Table.Row key={user.id} h="16">
              <Table.Cell
                borderTopWidth="1px"
                borderBottomWidth="0"
                borderColor="border.muted"
                fontWeight="medium"
              >
                {`${user.name} ${user.surname}`}
              </Table.Cell>

              <Table.Cell
                borderTopWidth="1px"
                borderBottomWidth="0"
                borderColor="border.muted"
                fontWeight="medium"
              >
                {user.email}
              </Table.Cell>

              <Table.Cell
                textAlign="center"
                borderTopWidth="1px"
                borderBottomWidth="0"
                borderColor="border.muted"
              >
                <UserRoleBadge role={user.userRole} />
              </Table.Cell>

              <Table.Cell
                textAlign="center"
                borderTopWidth="1px"
                borderBottomWidth="0"
                borderColor="border.muted"
              >
                <UserProviderIcon provider={user.userProvider} />
              </Table.Cell>

              <Table.Cell
                textAlign="center"
                borderTopWidth="1px"
                borderBottomWidth="0"
                borderColor="border.muted"
              >
                <UserStatusBadge isBlocked={user.isBlocked} />
              </Table.Cell>

              <Table.Cell
                borderTopWidth="1px"
                borderBottomWidth="0"
                borderColor="border.muted"
              >
                <UserMenu
                  user={user}
                  setSelectedUser={setSelectedUser}
                  setEditDialogOpen={setEditDialogOpen}
                  setDeleteDialogOpen={setDeleteDialogOpen}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <UsersDialogEdit
        isEditDialogOpen={isEditDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
        user={selectedUser}
        updateUser={updateUser}
        session={session}
      />

      <UsersDialogDelete
        isDeleteDialogOpen={isDeleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        user={selectedUser}
        removeUser={removeUser}
        session={session}
      />
    </Box>
  );
}

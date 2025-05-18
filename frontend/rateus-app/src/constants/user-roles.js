export const USER_ROLE = {
  USER: "USER",
  OWNER: "OWNER",
  MODERATOR: "MODERATOR",
  ADMIN: "ADMIN",
};

export function mapRoleName(role) {
  switch (role) {
    case USER_ROLE.USER:
      return "Пользователь";
    case USER_ROLE.OWNER:
      return "Владелец";
    case USER_ROLE.MODERATOR:
      return "Модератор";
    case USER_ROLE.ADMIN:
      return "Администратор";
  }
  return "Неизвестно";
}

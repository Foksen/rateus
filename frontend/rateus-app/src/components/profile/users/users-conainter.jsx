import { ProfilePageView } from "../profile-page-view";
import { UsersTable } from "./users-table";

export function UsersContainer({ initialUsers, session }) {
  return (
    <ProfilePageView
      title="Пользователи"
      description="Страница для управления пользователями"
      content={<UsersTable initialUsers={initialUsers} session={session} />}
    />
  );
}

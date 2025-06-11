import { ProfilePageView } from "../profile-page-view";
import { OrganizationsContent } from "./organizations-content";

export function OrganizationsContainer({ organizations }) {
  return (
    <ProfilePageView
      title="Ваши организации"
      description="На этой странице собрана информация о ваших организациях"
      content={<OrganizationsContent organizations={organizations} />}
    />
  );
}

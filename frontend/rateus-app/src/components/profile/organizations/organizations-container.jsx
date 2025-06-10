import { ProfilePageView } from "../profile-page-view";
import { OrganizationsSelfContent } from "./organizations-content";

export function OrganizationsSelfContainer({ organizations }) {
  return (
    <ProfilePageView
      title="Ваши организации"
      description="На этой странице собрана информация о ваших организациях"
      content={<OrganizationsSelfContent organizations={organizations} />}
    />
  );
}

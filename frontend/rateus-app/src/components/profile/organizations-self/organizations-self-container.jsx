import { ProfilePageView } from "../profile-page-view";
import { OrganizationsSelfContent } from "./organizations-self-content";

export function OrganizationsSelfContainer({ organizations }) {
  return (
    <ProfilePageView
      title="Ваши организации"
      description="На этой страницы собрана информация о ваших организациях"
      content={<OrganizationsSelfContent organizations={organizations} />}
    />
  );
}

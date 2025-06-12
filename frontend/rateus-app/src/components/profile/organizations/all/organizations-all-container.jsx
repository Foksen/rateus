import { ProfilePageView } from "../../profile-page-view";
import { OrganizationsAllContent } from "./organizations-all-content";

export function OrganizationsAllContainer({ organizations }) {
  return (
    <ProfilePageView
      title="Все организации"
      description="На этой странице собрана информация обо всех организациях"
      content={<OrganizationsAllContent organizations={organizations} />}
    />
  );
}

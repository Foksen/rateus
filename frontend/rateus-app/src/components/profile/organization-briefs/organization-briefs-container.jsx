import { ProfilePageView } from "../profile-page-view";
import { OrganizationBriefsContent } from "./organization-briefs-content";

export function OrganizationBriefsContainer({ organizationBriefs }) {
  return (
    <ProfilePageView
      title="Заявки на организации"
      description="На этой странице собрана информация о заявках на организации"
      content={
        <OrganizationBriefsContent organizationBriefs={organizationBriefs} />
      }
    />
  );
}

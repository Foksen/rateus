import { ProfilePageView } from "../profile-page-view";
import { OrganizationBriefsContent } from "./organization-briefs-content";

export function OrganizationBriefsSelfContainer({ organizationBriefs }) {
  return (
    <ProfilePageView
      title="Ваши заявки на организации"
      description="На этой странице собрана информация о ваших заявках на организации"
      content={
        <OrganizationBriefsContent organizationBriefs={organizationBriefs} />
      }
    />
  );
}

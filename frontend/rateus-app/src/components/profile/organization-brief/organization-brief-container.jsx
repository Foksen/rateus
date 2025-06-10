import { ProfilePageView } from "../profile-page-view";
import { OrganizationBriefContent } from "./organization-brief-content";

export function OrganizationBriefContainer({ session, organizationBrief }) {
  return (
    <ProfilePageView
      title={"Заявка на организацию"}
      content={
        <OrganizationBriefContent
          session={session}
          organizationBrief={organizationBrief}
        />
      }
      maxW="4xl"
    />
  );
}

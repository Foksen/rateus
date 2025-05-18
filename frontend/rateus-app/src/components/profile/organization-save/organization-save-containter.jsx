import { ProfilePageView } from "../profile-page-view";
import { OrganizationSaveView } from "./organization-save-view";

export function OrganizationSaveContainer({
  session,
  initialOrganization,
  initialOrganizationTypes,
}) {
  return (
    <ProfilePageView
      maxW="3xl"
      content={
        <OrganizationSaveView
          session={session}
          initialOrganizationTypes={initialOrganizationTypes}
          initialOrganization={initialOrganization}
        />
      }
    />
  );
}

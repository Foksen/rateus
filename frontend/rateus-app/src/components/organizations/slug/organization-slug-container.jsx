import { getPublicOrganization } from "@/lib/api/organizations";
import { OrganizationSlugView } from "./organization-slug-view";
import { REQUEST_TYPE } from "@/constants/request-type";

export async function OrganizationSlugContainer({ session, organizationId }) {
  return (
    <OrganizationSlugView
      session={session}
      organization={await getPublicOrganization(
        organizationId,
        REQUEST_TYPE.SSR
      )}
    />
  );
}

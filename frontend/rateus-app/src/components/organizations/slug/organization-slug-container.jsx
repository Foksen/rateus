import { getPublicOrganization } from "@/lib/api/organizations";
import { OrganizationSlugView } from "./organization-slug-view";

export async function OrganizationSlugContainer({ session, organizationId }) {
  return (
    <OrganizationSlugView
      session={session}
      organization={await getPublicOrganization(organizationId)}
    />
  );
}

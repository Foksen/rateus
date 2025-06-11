import { getPublicOrganization } from "@/lib/api/organizations";
import { OrganizationSlugView } from "./organization-slug-view";
import { getOrganizationReviews } from "@/lib/api/reviews";

export async function OrganizationSlugContainer({ session, organizationId }) {
  return (
    <OrganizationSlugView
      session={session}
      organization={await getPublicOrganization(organizationId)}
      reviews={await getOrganizationReviews(organizationId)}
    />
  );
}

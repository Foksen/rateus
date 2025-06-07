import { getPublicOrganizations } from "@/lib/api/organizations";
import { OrganizationsView } from "./organizations-view";
import { REQUEST_TYPE } from "@/constants/request-type";

export async function OrganizationsContainer() {
  return (
    <OrganizationsView
      initialOrganizations={await getPublicOrganizations(
        null,
        REQUEST_TYPE.SSR
      )}
    />
  );
}

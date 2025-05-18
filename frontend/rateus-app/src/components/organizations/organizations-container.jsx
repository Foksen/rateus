import { getPublicOrganizations } from "@/lib/api/organizations";
import { OrganizationsView } from "./organizations-view";

export async function OrganizationsContainer() {
  return (
    <OrganizationsView
      initialOrganizations={(await getPublicOrganizations()).organizations}
    />
  );
}

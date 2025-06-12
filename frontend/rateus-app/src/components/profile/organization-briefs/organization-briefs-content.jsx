import { Box } from "@chakra-ui/react";
import { OrganizationBriefsGrid } from "./organization-briefs-grid";

export function OrganizationBriefsContent({ organizationBriefs }) {
  return (
    <Box>
      <OrganizationBriefsGrid organizationBriefs={organizationBriefs} />
    </Box>
  );
}

import { Box, Flex } from "@chakra-ui/react";
import { OrganizationBriefsSelfGrid } from "./organization-briefs-grid";

export function OrganizationBriefsSelfContent({ organizationBriefs }) {
  return (
    <Box>
      <OrganizationBriefsSelfGrid organizationBriefs={organizationBriefs} />
    </Box>
  );
}

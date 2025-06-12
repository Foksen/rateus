import { Box, Flex } from "@chakra-ui/react";
import { OrganizationsAllGrid } from "./organizations-all-grid";

export function OrganizationsAllContent({ organizations }) {
  return (
    <Box>
      <OrganizationsAllGrid organizations={organizations} />
    </Box>
  );
}

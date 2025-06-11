"use client";

import { Flex } from "@chakra-ui/react";
import { OrganizationsFiltersView } from "./organizations-filters-view";
import { OrganizationsGridView } from "./organizations-grid-view";
import { useState } from "react";

export function OrganizationsView({ initialOrganizations }) {
  const [organizations, setOrganizations] = useState(initialOrganizations);
  return (
    <Flex pt="10" pb="20" gap="10" px="10" maxW="1660px" mx="auto">
      {/* <OrganizationsFiltersView /> */}
      <OrganizationsGridView organizations={organizations} />
    </Flex>
  );
}

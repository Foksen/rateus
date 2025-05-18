"use client";

import { Alert, Box, Flex } from "@chakra-ui/react";
import { OrganizationTypesTable } from "./organization-types-table";
import { useState } from "react";
import { OrganizationTypesActionCreate } from "./actions/organization-types-action-create";

export function OrganizationTypesContent({
  initialOrganizationTypes,
  session,
}) {
  const [organizationTypes, setOrganizationTypes] = useState(
    initialOrganizationTypes
  );

  const addOrganizationType = (newOrganizationType) => {
    setOrganizationTypes((prev) => [...prev, newOrganizationType]);
  };

  const updateOrganizationType = (id, newOrganizationType) => {
    setOrganizationTypes((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, ...newOrganizationType } : cat
      )
    );
  };

  const removeOrganizationType = (id) => {
    setOrganizationTypes((prev) => prev.filter((cat) => cat.id !== id));
  };

  return (
    <Box>
      <Flex mt="5" justify="end">
        <OrganizationTypesActionCreate
          session={session}
          addOrganizationType={addOrganizationType}
        />
      </Flex>

      <OrganizationTypesTable
        session={session}
        organizationTypes={organizationTypes}
        updateOrganizationType={updateOrganizationType}
        removeOrganizationType={removeOrganizationType}
      />
    </Box>
  );
}

import { Grid } from "@chakra-ui/react";
import { OrganizationBriefsSelfGridItem } from "./organization-briefs-grid-item";

export function OrganizationBriefsSelfGrid({ organizationBriefs }) {
  return (
    <Grid
      mt="6"
      templateColumns={{
        base: "repeat(1, 1fr)",
        lg: "repeat(2, 1fr)",
        "2xl": "repeat(3, 1fr)",
      }}
      gap="5"
    >
      {organizationBriefs
        ?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .map((organizationBrief, index) => (
          <OrganizationBriefsSelfGridItem
            organizationBrief={organizationBrief}
            key={index}
          />
        ))}
    </Grid>
  );
}

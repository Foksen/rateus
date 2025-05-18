import { Grid } from "@chakra-ui/react";
import { OrganizationsSelfGridItem } from "./organizations-self-grid-item";

export function OrganizationsSelfGrid({ organizations }) {
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
      {organizations.map((organization, index) => (
        <OrganizationsSelfGridItem organization={organization} key={index} />
      ))}
    </Grid>
  );
}

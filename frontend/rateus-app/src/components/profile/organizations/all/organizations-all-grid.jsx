import { Grid } from "@chakra-ui/react";
import { OrganizationsAllGridItem } from "./organizations-all-grid-item";

export function OrganizationsAllGrid({ organizations }) {
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
      {organizations?.map((organization, index) => (
        <OrganizationsAllGridItem organization={organization} key={index} />
      ))}
    </Grid>
  );
}

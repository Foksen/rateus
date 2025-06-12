import { Grid } from "@chakra-ui/react";
import { ReviewsSelfGridItem } from "./reviews-self-grid-item";

export function ReviewsSelfGrid({ reviews }) {
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
      {reviews?.map((review, index) => (
        <ReviewsSelfGridItem review={review} key={index} />
      ))}
    </Grid>
  );
}

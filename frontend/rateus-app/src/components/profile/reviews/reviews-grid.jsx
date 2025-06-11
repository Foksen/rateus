import { Grid } from "@chakra-ui/react";
import { ReviewsGridItem } from "./reviews-grid-item";

export function ReviewsGrid({ reviews }) {
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
        <ReviewsGridItem review={review} key={index} />
      ))}
    </Grid>
  );
}

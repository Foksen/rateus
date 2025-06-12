import { Grid } from "@chakra-ui/react";
import { ReviewsAllGridItem } from "./reviews-all-grid-item";

export function ReviewsAllGrid({ reviews }) {
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
        <ReviewsAllGridItem review={review} key={index} />
      ))}
    </Grid>
  );
}

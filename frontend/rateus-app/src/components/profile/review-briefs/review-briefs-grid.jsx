import { Grid } from "@chakra-ui/react";
import { ReviewBriefsGridItem } from "./review-briefs-grid-item";

export function ReviewBriefsGrid({ reviewBriefs }) {
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
      {reviewBriefs
        ?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .map((reviewBrief, index) => (
          <ReviewBriefsGridItem reviewBrief={reviewBrief} key={index} />
        ))}
    </Grid>
  );
}

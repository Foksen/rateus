import { Box } from "@chakra-ui/react";
import { ReviewsAllGrid } from "./reviews-all-grid";

export function ReviewsAllContent({ reviews }) {
  return (
    <Box>
      <ReviewsAllGrid reviews={reviews} />
    </Box>
  );
}

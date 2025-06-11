import { Box, Flex } from "@chakra-ui/react";
import { ReviewsGrid } from "./reviews-grid";

export function ReviewsContent({ reviews }) {
  return (
    <Box>
      <ReviewsGrid reviews={reviews} />
    </Box>
  );
}

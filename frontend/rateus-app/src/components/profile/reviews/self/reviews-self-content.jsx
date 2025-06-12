import { Box } from "@chakra-ui/react";
import { ReviewsSelfGrid } from "./reviews-self-grid";

export function ReviewsSelfContent({ reviews }) {
  return (
    <Box>
      <ReviewsSelfGrid reviews={reviews} />
    </Box>
  );
}

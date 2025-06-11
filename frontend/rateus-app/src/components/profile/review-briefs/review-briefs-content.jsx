import { Box } from "@chakra-ui/react";
import { ReviewBriefsGrid } from "./review-briefs-grid";

export function ReviewBriefsContent({ reviewBriefs }) {
  return (
    <Box>
      <ReviewBriefsGrid reviewBriefs={reviewBriefs} />
    </Box>
  );
}

import { Box } from "@chakra-ui/react";

export default function ProfileLayout({ children }) {
  return (
    <Box minHeight="dvh" bg="bg.subtle">
      {children}
    </Box>
  );
}

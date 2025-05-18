import { Box, Heading, Text } from "@chakra-ui/react";

export function ProfilePageView({ title, description, content, ...props }) {
  return (
    <Box px="12" py="8" {...props}>
      <Box
        p="10"
        bg="bg"
        rounded="md"
        borderWidth="1px"
        borderColor="border.muted"
      >
        {title && <Heading textStyle="2xl">{title}</Heading>}
        {description && (
          <Text mt="2" color="fg.muted" width="prose">
            {description}
          </Text>
        )}

        {content}
      </Box>
    </Box>
  );
}

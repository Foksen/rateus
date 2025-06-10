import { PROFILE_PAGE } from "@/constants/profile-pages";
import { ACCENT_COLOR } from "@/constants/ui";
import { Box, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { OrganizationsSelfGrid } from "./organizations-grid";

export function OrganizationsSelfContent({ organizations }) {
  return (
    <Box>
      <Flex mt="5" justify="end">
        <Button variant="surface" colorPalette={ACCENT_COLOR} size="sm">
          <Link href={`/profile/${PROFILE_PAGE.ORGANIZATIONS_SELF}/save/new`}>
            Создать организацию
          </Link>
        </Button>
      </Flex>

      <OrganizationsSelfGrid organizations={organizations} />
    </Box>
  );
}

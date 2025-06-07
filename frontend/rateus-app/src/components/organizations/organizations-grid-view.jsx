import {
  ButtonGroup,
  Flex,
  Grid,
  IconButton,
  Pagination,
  Text,
} from "@chakra-ui/react";
import { OrganizationsGridItemView } from "./organizations-grid-item-view";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export function OrganizationsGridView({ organizations }) {
  return (
    <Flex
      w="full"
      direction="column"
      px="10"
      pt="8"
      pb="10"
      bg="bg"
      borderWidth="1px"
      borderColor="bg.muted"
      rounded="md"
    >
      <Text textStyle="2xl" fontWeight="medium">
        Организации
      </Text>

      <Grid
        mt="6"
        templateColumns={{
          base: "repeat(1, 1fr)",
          lg: "repeat(2, 1fr)",
          "2xl": "repeat(3, 1fr)",
        }}
        gap="5"
      >
        {organizations?.map((organization, index) => (
          <OrganizationsGridItemView key={index} organization={organization} />
        ))}
      </Grid>

      {/* <Pagination.Root
        mt="10"
        mx="auto"
        count={34}
        pageSize={20}
        defaultPage={1}
      >
        <ButtonGroup variant="ghost">
          <Pagination.PrevTrigger asChild>
            <IconButton>
              <LuChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page) => (
              <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton>
              <LuChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root> */}
    </Flex>
  );
}

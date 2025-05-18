import {
  Checkbox,
  createListCollection,
  Field,
  Fieldset,
  Icon,
  Input,
  Portal,
  Select,
  VStack,
} from "@chakra-ui/react";
import { TbStarFilled } from "react-icons/tb";

export function OrganizationsFiltersView() {
  const typesCollection = createListCollection({
    items: [
      { label: "Гостиницы", value: "hostels" },
      { label: "Магазины", value: "shops" },
    ],
  });

  return (
    <VStack
      h="fit"
      px="8"
      py="8"
      minW="72"
      bg="bg"
      align="start"
      borderWidth="1px"
      borderColor="border.muted"
      rounded="md"
    >
      <Fieldset.Root>
        <Fieldset.Legend textStyle="xl">Фильтры</Fieldset.Legend>

        <Fieldset.Content gap="5">
          <Field.Root>
            <Field.Label>Название организации</Field.Label>
            <Input name="name" size="sm" placeholder="Любое" />
          </Field.Root>

          <Field.Root>
            <Field.Label mb="1">Рейтинг </Field.Label>

            <Checkbox.Root gap="3">
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>
                <Icon mb="2px" size="sm" color="yellow.400">
                  <TbStarFilled />
                </Icon>
                <Icon mb="2px" size="sm" color="yellow.400">
                  <TbStarFilled />
                </Icon>
                <Icon mb="2px" color="yellow.400">
                  <TbStarFilled />
                </Icon>
                <Icon mb="2px" color="yellow.400">
                  <TbStarFilled />
                </Icon>
                <Icon mb="2px" color="yellow.400">
                  <TbStarFilled />
                </Icon>
              </Checkbox.Label>
            </Checkbox.Root>

            <Checkbox.Root gap="3">
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>
                <Icon mb="2px" size="sm" color="yellow.400">
                  <TbStarFilled />
                </Icon>
                <Icon mb="2px" size="sm" color="yellow.400">
                  <TbStarFilled />
                </Icon>
                <Icon mb="2px" size="sm" color="yellow.400">
                  <TbStarFilled />
                </Icon>
                <Icon mb="2px" size="sm" color="yellow.400">
                  <TbStarFilled />
                </Icon>
              </Checkbox.Label>
            </Checkbox.Root>

            <Checkbox.Root gap="3">
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>
                <Icon mb="2px" size="sm" color="yellow.400">
                  <TbStarFilled />
                </Icon>
                <Icon mb="2px" size="sm" color="yellow.400">
                  <TbStarFilled />
                </Icon>
                <Icon mb="2px" size="sm" color="yellow.400">
                  <TbStarFilled />
                </Icon>
              </Checkbox.Label>
            </Checkbox.Root>

            <Checkbox.Root gap="3">
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>
                <Icon mb="2px" size="sm" color="yellow.400">
                  <TbStarFilled />
                </Icon>
                <Icon mb="2px" size="sm" color="yellow.400">
                  <TbStarFilled />
                </Icon>
              </Checkbox.Label>
            </Checkbox.Root>

            <Checkbox.Root gap="3">
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>
                <Icon mb="2px" size="sm" color="yellow.400">
                  <TbStarFilled />
                </Icon>
              </Checkbox.Label>
            </Checkbox.Root>
          </Field.Root>

          <Select.Root multiple collections={typesCollection} size="sm">
            <Select.HiddenSelect />
            <Select.Label>Тип организации</Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Любой" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {typesCollection.items.map((type) => (
                    <Select.Item item={type} key={type.value}>
                      {type.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </Fieldset.Content>
      </Fieldset.Root>
    </VStack>
  );
}

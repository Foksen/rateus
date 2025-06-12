import { Box, Field, Fieldset, Stack, Text } from "@chakra-ui/react";
import { SidebarProfile } from "../sidebar/profile-sidebar-view";
import { getSelfUser } from "@/lib/api/user";
import { formatDateTimeStrict } from "@/lib/utils/date-time-format";
import Image from "next/image";
import { SettingsActionEdit } from "./actions/settings-action-edit";

function UserProviderIcon({ provider }) {
  switch (provider) {
    case "EMAIL": {
      return (
        <Image
          width="66"
          height="20"
          src="/svg/RateUs.svg"
          alt="RateUs"
          style={{
            height: "12px",
            width: "auto",
            marginTop: "10px",
          }}
        />
      );
    }
    case "YANDEX": {
      return (
        <Image
          alt="yandex"
          width="24"
          height="24"
          src="/svg/YandexIcon.svg"
          style={{
            marginTop: "5px",
          }}
        />
      );
    }
  }
}

export async function SettingsContent({ session }) {
  const user = await getSelfUser(session.token);

  return (
    <Box>
      <Stack mt="6">
        <Fieldset.Root size="lg">
          <Fieldset.Legend>Информация об аккаунте</Fieldset.Legend>

          <Fieldset.Content mt="5" gap="7">
            <Field.Root>
              <Field.Label>Профиль</Field.Label>
              <SidebarProfile
                mt="2"
                size="md"
                username={`${user?.name} ${user?.surname}`}
                role={user?.userRole}
                useravatar={user?.avatarUrl}
              />
            </Field.Root>

            <Stack direction="row">
              <Field.Root>
                <Field.Label>Почта</Field.Label>
                <Text mt="2">{user?.email}</Text>
              </Field.Root>

              <Field.Root>
                <Field.Label>Сервис</Field.Label>
                <Box>
                  <UserProviderIcon provider={user?.userProvider} />
                </Box>
              </Field.Root>
            </Stack>

            <Stack direction="row">
              <Field.Root>
                <Field.Label>Аккаунт создан</Field.Label>
                <Text mt="2">{formatDateTimeStrict(user?.createdAt)}</Text>
              </Field.Root>

              <Field.Root>
                <Field.Label>Последнее изменение</Field.Label>
                <Text mt="2">{formatDateTimeStrict(user?.updatedAt)}</Text>
              </Field.Root>
            </Stack>

            <Field.Root>
              <Field.Label>Идентификатор аккаунта</Field.Label>
              <Text mt="2">{user?.id}</Text>
            </Field.Root>

            <SettingsActionEdit user={user} session={session} />
          </Fieldset.Content>
        </Fieldset.Root>
      </Stack>
    </Box>
  );
}

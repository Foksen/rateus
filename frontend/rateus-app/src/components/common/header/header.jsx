import { Button, Flex, HStack } from "@chakra-ui/react";
import Image from "next/image";
import { Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";
import { ACCENT_COLOR } from "@/constants/ui";
import { Profile } from "../profile/profile";

export function Header({ session }) {
  return (
    <HStack
      as="header"
      justify="space-between"
      h="16"
      px="20"
      bg="bg"
      borderBottomWidth="1px"
      borderColor="border.muted"
    >
      <Link href="/">
        <Image
          width="112"
          height="39"
          src="/svg/RateUs.svg"
          alt="RateUs"
          style={{
            height: "16px",
            width: "auto",
          }}
        />
      </Link>

      {/* <HStack>
        <Flex gap="28">
          <ChakraLink fontWeight="medium" outline="none" asChild>
            <Link href="/organizations">Организации</Link>
          </ChakraLink>
          <ChakraLink fontWeight="medium" outline="none" asChild>
            <Link href="/about">О сервисе</Link>
          </ChakraLink>
          <ChakraLink fontWeight="medium" outline="none" asChild>
            <Link href="/help">Поддержка</Link>
          </ChakraLink>
        </Flex>
      </HStack> */}

      {session ? (
        <Button pl="2" pr="14px" py="22px" variant="ghost" asChild>
          <Link href="/profile">
            <Profile
              size="sm"
              username={`${session.user.surname} ${session?.user?.name?.[0]}.`}
              avatarUrl={session.user.avatarUrl}
              hideRole={true}
            />
          </Link>
        </Button>
      ) : (
        <Button size="sm" colorPalette={ACCENT_COLOR} variant="surface" asChild>
          <Link href="/auth/sign-in">Войти</Link>
        </Button>
      )}
    </HStack>
  );
}

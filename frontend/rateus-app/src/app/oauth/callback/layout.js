"use client";

import { Center, Spinner } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

export default function CallbackLayout({ children }) {
  return (
    <Center minH="dvh" bg="bg.subtle">
      <Spinner size="lg" />

      <SessionProvider>{children}</SessionProvider>
    </Center>
  );
}

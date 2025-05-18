import { Box, Center } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export default function AuthPage({ children }) {
  return (
    <Center minHeight="dvh" bg="bg.subtle">
      <Box position="absolute" top="8">
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
      </Box>
      {children}
    </Center>
  );
}

import { Provider } from "@/components/ui/provider";
import { Box } from "@chakra-ui/react";

export default function RootLayout({ children }) {
  return (
    <html lang="ru" suppressHydrationWarning={true}>
      <body>
        <Provider forcedTheme="light">
          <Box minH="dvh" bg="bg.subtle">
            {children}
          </Box>
        </Provider>
      </body>
    </html>
  );
}

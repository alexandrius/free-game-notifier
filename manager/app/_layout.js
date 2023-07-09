import { Stack } from "expo-router";
import { FetchProvider } from "fetch-yo-mama";

export default function RootLayout() {
  return (
    <FetchProvider
      aliases={{
        default: { baseUrl: "https://freegames.s-pataridze.workers.dev" },
      }}
    >
      <RootLayoutNav />
    </FetchProvider>
  );
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(root)" options={{ headerShown: false }} />
    </Stack>
  );
}

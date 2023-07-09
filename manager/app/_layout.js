import { Stack } from "expo-router";
import { FetchProvider } from "fetch-yo-mama";

export default function RootLayout() {
  return (
    <FetchProvider
      aliases={{
        default: {
          baseUrl: __DEV__
            ? "http://127.0.0.1:8787"
            : "https://freegames.s-pataridze.workers.dev",
          headers: { "Content-Type": "application/json" },
        },
      }}
    >
      <RootLayoutNav />
    </FetchProvider>
  );
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="admin" options={{ headerShown: false }} />
    </Stack>
  );
}

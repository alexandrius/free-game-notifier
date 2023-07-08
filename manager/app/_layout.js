import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const temp = "";
  return (
    <Stack>
      <Stack.Screen name="(root)" options={{ headerShown: false }} />
    </Stack>
  );
}

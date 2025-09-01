import useCustomFonts from "@/shared/hooks/useCustomFonts";
import { Stack } from "expo-router";

export default function RootLayout() {
  const isLoaded = useCustomFonts();

  if (!isLoaded) return <></>;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="cities/index" options={{ headerShown: false }} />
      <Stack.Screen name="cities/[name]" options={{ headerShown: false }} />
    </Stack>
  );
}

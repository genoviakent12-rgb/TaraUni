import { Stack } from "expo-router";

export default function ServicesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CarpoolScreen" />
      <Stack.Screen name="CreateCarpoolScreen" />
      <Stack.Screen name="TransportationsScreen" />
    </Stack>
  );
}
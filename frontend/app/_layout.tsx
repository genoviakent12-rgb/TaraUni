import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { View } from "react-native";
import { Fonts } from "@/constants/theme";
import "../global.css";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    fontHero: Fonts.font.fontHero,
    fontBold: Fonts.font.fontBold,
    fontMedium: Fonts.font.fontMedium,
    fontRegular: Fonts.font.fontRegular,
    fontExtraBold: Fonts.font.fontExtraBold,
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
        }}
      />
    );
  }

  return (
    <AuthProvider>
      <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    />
    </AuthProvider>
  );
}
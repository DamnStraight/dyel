import { Suspense } from "react";
import { TamaguiProvider, Theme } from "tamagui";
import { DatabaseConnectionProvider } from "../context/DatabaseConnectionContext";
import config from "@Root/tamagui.config";
import { useColorScheme } from "react-native";
import { useFonts } from "expo-font";

export const Provider: FCC = ({ children }) => {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
      <Theme name={colorScheme === "dark" ? "dark" : "light"}>
        <DatabaseConnectionProvider>
        <Suspense>
          {children}
        </Suspense></DatabaseConnectionProvider>
      </Theme>
    </TamaguiProvider>
  );
};

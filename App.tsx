import "reflect-metadata";
import { Provider } from "@App/provider";
import RootNavigation from "@App/navigation";
import { Platform } from "react-native";
import { enableScreens } from "react-native-screens";
import { useEffect } from "react";

export default function App() {
  // Fix tab bar being incorrectly hidden
  // https://github.com/react-navigation/react-navigation/issues/10432
  useEffect(() => {
    if (Platform.OS === "ios") {
      enableScreens(false);
    }
  }, []);

  return (
    <Provider>
      <RootNavigation />
    </Provider>
  );
}

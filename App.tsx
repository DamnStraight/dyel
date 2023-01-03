import "reflect-metadata";
import { extendTheme, NativeBaseProvider, useColorMode } from "native-base";
import RootNavigation from "./Navigation";
import { DatabaseConnectionProvider } from "./app/context/DatabaseConnectionContext";

const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

const customTheme = extendTheme({ config });

export default function App() {
  // @TODO Look into this bug, setting initialColorMode to 'dark' should be enough
  const cm = useColorMode();
  cm.setColorMode("dark");

  return (
    <NativeBaseProvider theme={customTheme}>
      <DatabaseConnectionProvider>
        <RootNavigation />
      </DatabaseConnectionProvider>
    </NativeBaseProvider>
  );
}

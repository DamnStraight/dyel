import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { extendTheme, NativeBaseProvider } from "native-base";
import { StyleSheet, Text, View } from "react-native";

const Tab = createBottomTabNavigator();

const config = {
  useSystemColormode: false,
  initialColorMode: "dark",
};

const customTheme = extendTheme({ config });

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}

export default function App() {
  return (
    <NativeBaseProvider theme={customTheme}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootTabParamList } from "@App/Navigation";
import { SafeAreaView, StyleSheet } from "react-native";
import { H1, Heading, ScrollView, Stack, styled } from "tamagui";

// ─── Component & Props ─────────────────────────────────────────────────── ✣ ─
interface WorkoutProps
  extends NativeStackScreenProps<RootTabParamList, "History"> {}

const ScreenHeader = styled(H1, {
  textShadowColor: "rgba(0, 0, 0, 0.75)",
  textShadowOffset: { width: -1, height: 0 },
  textShadowRadius: 10,
});

function HistoryScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} p="$4">
        <Stack w="100%" p={5}>
          <ScreenHeader color="$slate50" size="$12">
            History
          </ScreenHeader>
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HistoryScreen;

// ─── Styles ────────────────────────────────────────────────────────────── ✣ ─

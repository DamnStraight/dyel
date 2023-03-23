import { RootTabParamList } from "@App/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native";
import { ScrollView, Stack } from "tamagui";
import { ScreenHeader } from "../../components/ScreenHeader";

// ─── Component & Props ─────────────────────────────────────────────────── ✣ ─
interface WorkoutProps
  extends NativeStackScreenProps<RootTabParamList, "History"> {}

function HistoryScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} p="$4">
        <Stack w="100%" p={5}>
          <ScreenHeader>History</ScreenHeader>
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HistoryScreen;
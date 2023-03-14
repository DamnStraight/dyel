import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootTabParamList } from "@Root/Navigation";
import { Box, Heading, ScrollView, Stack, View } from "native-base";
import { StyleSheet } from "react-native";

// ─── Component & Props ─────────────────────────────────────────────────── ✣ ─
// prettier-ignore
interface WorkoutProps extends NativeStackScreenProps<RootTabParamList, "History"> {}

function HistoryScreen() {
  return (
    <Box safeAreaTop>
      <ScrollView
        w="full"
        h="full"
      >
        <View p="4">
          <Stack w="full" space="4">
            <Heading size="4xl" style={styles.header}>
              History
            </Heading>
          </Stack>
        </View>
      </ScrollView>
    </Box>
  );
}

export default HistoryScreen;

// ─── Styles ────────────────────────────────────────────────────────────── ✣ ─

const styles = StyleSheet.create({
  header: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { H1, ScrollView, Stack, YStack } from "tamagui";
import { RootWorkoutStackParamList } from "../../../navigation";
import { useBoundStore } from "../../../store";
import Timer from "./Timer";

type ActiveWorkoutModalProps = {} & NativeStackScreenProps<
  RootWorkoutStackParamList,
  "ActiveWorkoutModal"
>;

const ActiveWorkoutModal: FC<ActiveWorkoutModalProps> = () => {
  const { activeWorkout } = useBoundStore(({ activeWorkout }) => ({
    activeWorkout,
  }));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack flex={1}>
        <YStack flex={1} padding="$4">
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} flex={1}>
            <Stack flex={1} p={4}>
              <YStack flex={1} space="$4">
                <H1 color="$slate50" size="$12" style={styles.header}>
                  {activeWorkout.workout.name}
                </H1>
                <H1 color="$slate50" size="$12" style={styles.header}>
                  <Timer />
                </H1>
              </YStack>
            </Stack>
          </ScrollView>
        </YStack>
      </Stack>
    </SafeAreaView>
  );
};

export default ActiveWorkoutModal;

const styles = StyleSheet.create({
  header: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

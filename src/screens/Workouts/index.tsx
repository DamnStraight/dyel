import { WorkoutModel } from "@App/data/entities/Workout";
import { RootWorkoutStackParamList } from "@App/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { RefreshControl, SafeAreaView, StyleSheet } from "react-native";
import { H1, H2, ScrollView, Stack, YStack } from "tamagui";
import FAB from "../../components/FAB";
import { useBoundStore } from "../../store";

// ─── Component & Props ─────────────────────────────────────────────────── ✣ ─
function WorkoutCard({ name }: Pick<WorkoutModel, "name">) {
  return (
    <YStack padding={15} borderRadius={15} elevation={5} bg="white" animation="bouncy" height={100} pressStyle={{ height: 200}}>
      <YStack>
        <H2 color="black">{name}</H2>
      </YStack>
    </YStack>
  );
}

// prettier-ignore
interface WorkoutProps extends NativeStackScreenProps<RootWorkoutStackParamList, "WorkoutScreen"> {}

function WorkoutScreen({ navigation }: WorkoutProps) {
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const workouts = useBoundStore((state) => state.workouts);
  const fetchWorkouts = useBoundStore((state) => state.fetchWorkouts);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchWorkouts();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        w="100%"
        h="100%"
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        p="$4"
      >
        <Stack p={5}>
          <Stack w="100%" space="$4">
            <H1 color="$slate50" size="$12" style={styles.header}>
              Workouts
            </H1>
            {workouts.map(({ name }, i) => (
              <WorkoutCard key={`${i}-${name}`} name={name} />
            ))}
          </Stack>
        </Stack>
      </ScrollView>
      <FAB
        color="$indigo700"
        iconColor="white"
        onPress={() => navigation.navigate("AddWorkoutModal")}
      />
    </SafeAreaView>
  );
}

export default WorkoutScreen;

// ─── Styles ────────────────────────────────────────────────────────────── ✣ ─

const styles = StyleSheet.create({
  header: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

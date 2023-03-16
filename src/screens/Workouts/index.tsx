import { RootWorkoutStackParamList } from "@App/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl, SafeAreaView, StyleSheet } from "react-native";
import { Button, H1, Heading, ScrollView, Stack } from "tamagui";
import { useDatabase } from "../../hooks/useDatabase";
import { FontAwesome } from "@expo/vector-icons";
import FAB from "../../components/FAB";

// ─── Component & Props ─────────────────────────────────────────────────── ✣ ─
// prettier-ignore
interface WorkoutProps extends NativeStackScreenProps<RootWorkoutStackParamList, "WorkoutScreen"> {}

function WorkoutScreen({ navigation }: WorkoutProps) {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const { workoutRepository } = useDatabase();

  useEffect(() => {
    // Refresh the exercise list whenever the screen comes back into focus
    const unsubscribe = navigation.addListener("focus", () => {
      workoutRepository.getAll().then(setWorkouts);
    });

    return unsubscribe;
  }, [navigation]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    const result = await workoutRepository.getAll();
    setWorkouts(result);

    setRefreshing(false);
  }, []);

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
              <Heading key={i}>{name}</Heading>
            ))}
          </Stack>
        </Stack>
      </ScrollView>
      {/* TODO Convert this to FAB component */}
      <FAB onPress={() => navigation.navigate("AddWorkoutModal")} />
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

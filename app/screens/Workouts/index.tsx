import { FontAwesome5 } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootTabParamList } from "@Root/Navigation";
import { Box, Fab, Heading, Icon, ScrollView, Stack, View } from "native-base";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl, StyleSheet } from "react-native";

// ─── Component & Props ─────────────────────────────────────────────────── ✣ ─
// prettier-ignore
interface WorkoutProps extends NativeStackScreenProps<RootTabParamList, "Workouts"> {}

function WorkoutsScreen({ navigation }: WorkoutProps) {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    // Refresh the exercise list whenever the screen comes back into focus
    const unsubscribe = navigation.addListener("focus", () => {
      // workoutuRespository.getAll().then(setWorkouts);
    });

    return unsubscribe;
  }, [navigation]);

  const onRefresh = useCallback(async () => {
    // setRefreshing(true);
    // const result = await workRepository.getAll();
    // setWorkouts(result);
    // setRefreshing(false);
  }, []);

  return (
    <Box safeAreaTop>
      <ScrollView
        w="full"
        h="full"
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        <View p="4">
          <Stack w="full" space="4">
            <Heading size="4xl" style={styles.header}>
              Workouts
            </Heading>
            {workouts.map(({ name }, i) => (
              <ExerciseCard key={`${i}-${name}`} name={name} />
            ))}
          </Stack>
        </View>
      </ScrollView>
      <Fab
        onPress={() => navigation.navigate("AddExerciseModal")}
        renderInPortal={false}
        shadow={4}
        size="lg"
        w="75"
        h="75"
        icon={<Icon as={FontAwesome5} name="plus" size="xl" ml="1" />}
        backgroundColor="violet.700"
      />
    </Box>
  );
}

export default WorkoutsScreen;

// ─── Styles ────────────────────────────────────────────────────────────── ✣ ─

const styles = StyleSheet.create({
  header: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

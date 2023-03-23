import { ExerciseModel } from "@App/data/entities/Exercise";
import { useDatabase } from "@App/hooks/useDatabase";
import { RootExerciseStackParamList } from "@App/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { RefreshControl, SafeAreaView, StyleSheet } from "react-native";
import { H2, ScrollView, Stack, Text, YStack } from "tamagui";
import { ScreenHeader } from "../../components/ScreenHeader";
import { useBoundStore } from "../../store";
import { CreateExerciseModal } from "./CreateExerciseModal";

function ExerciseCard({ name }: Pick<ExerciseModel, "name">) {
  return (
    <YStack padding={15} borderRadius={15} elevation={5} bg="white">
      <YStack>
        <H2 color="black">{name}</H2>
        <Text>Sample description blabla</Text>
      </YStack>
    </YStack>
  );
}

// ─── Component & Props ─────────────────────────────────────────────────── ✣ ─
// prettier-ignore
interface ExerciseProps extends NativeStackScreenProps<RootExerciseStackParamList, "ExerciseScreen"> {}

export default function ExerciseScreen({ navigation }: ExerciseProps) {
  const { exerciseRepository } = useDatabase();
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const { exercises, fetchExercises, addExercise } = useBoundStore(
    ({ exercises, fetchExercises, addExercise }) => ({
      exercises,
      fetchExercises,
      addExercise,
    })
  );

  const onRefresh = async () => {
    setRefreshing(true);

    await fetchExercises();

    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack flex={1}>
        <YStack flex={1} padding="$4">
          <ScrollView
            flex={1}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
          >
            <Stack p={4}>
              <YStack flex={1} space="$4">
                <ScreenHeader>
                  Exercises
                </ScreenHeader>
                {exercises.map(({ name }, i) => (
                  <ExerciseCard key={`${i}-${name}`} name={name} />
                ))}
              </YStack>
            </Stack>
          </ScrollView>
        </YStack>
        {/* <FAB
          color="$indigo700"
          iconColor="white"
          onPress={() => navigation.navigate("AddExerciseModal")}
        /> */}
        <CreateExerciseModal onSuccess={(exercise) => addExercise(exercise)} />
      </Stack>
    </SafeAreaView>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────── ✣ ─

const styles = StyleSheet.create({
  header: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

// shadowOffsetX = 0 , shadowOffsetY = 0, shadowRadius=13, shadowopacity=0.1

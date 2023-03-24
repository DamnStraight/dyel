import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { SafeAreaView, StyleSheet } from "react-native";
import { H1, ScrollView, Stack, YStack } from "tamagui";
import ExerciseSetCard from "../../../components/ExerciseSetCard";
import { ExerciseModel } from "../../../data/entities/Exercise";
import { WorkoutModel } from "../../../data/entities/Workout";
import { RootWorkoutStackParamList } from "../../../navigation";
import { useBoundStore } from "../../../store";
import { AddWorkoutFormValues, ExerciseSetDto } from "../AddWorkoutModal/types";
import Timer from "./Timer";

type ActiveWorkoutModalProps = {} & NativeStackScreenProps<
  RootWorkoutStackParamList,
  "ActiveWorkoutModal"
>;

const ActiveWorkoutModal: FC<ActiveWorkoutModalProps> = () => {
  const { activeWorkout } = useBoundStore(({ activeWorkout }) => ({
    activeWorkout,
  }));

  const {
    control,
    register,
    handleSubmit,
    getValues,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AddWorkoutFormValues>({
    defaultValues: {
      exercises: activeWorkout!.workout.exercises as any,
    },
  });

  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: "exercises",
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack flex={1}>
        <YStack flex={1} padding="$4">
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} flex={1}>
            <Stack flex={1} p={4}>
              <YStack flex={1} space="$4">
                <H1 color="$slate50" size="$12" style={styles.header}>
                  {activeWorkout?.workout.name}
                </H1>
                <H1 color="$slate50" size="$12" style={styles.header}>
                  <Timer />
                </H1>
                <YStack height="100%" w="100%" space="$4" p="$4">
                  <YStack space="$4">
                    {fields.map((item, index) => (
                      <ExerciseSetCard
                        exerciseName={item.name}
                        exerciseIndex={index}
                        key={item.id}
                        {...{ control }}
                      />
                    ))}
                  </YStack>
                </YStack>
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

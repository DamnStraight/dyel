import ExercisePicker from "@App/components/ExercisePicker";
import { ExerciseModel } from "@App/data/entities/Exercise";
import { useDatabase } from "@App/hooks/useDatabase";
import { FontAwesome5 } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootWorkoutStackParamList } from "@App/Navigation";
import { useEffect, useMemo, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import ExerciseSetCard from "../../../components/ExerciseSetCard";
import { AddWorkoutFormValues, DEFAULT_SET } from "./types";
import { SafeAreaView } from "react-native";
import { Button, Heading, Input, ScrollView, Stack, YStack } from "tamagui";

// ─── Component & Props ─────────────────────────────────────────────────── ✣ ─
// prettier-ignore
interface AddWorkoutProps extends NativeStackScreenProps<RootWorkoutStackParamList, "AddWorkoutModal"> {}

/*
  TODO:
    - Create a better Set type picker
    - Remove uses of 'any' type
    - Fix Set Type numbering
    - Add haptic feedback to UI
    - Resize elements to be more mobile ergonomic  
*/
function AddWorkoutModal({ navigation }: AddWorkoutProps) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [exercises, setExercises] = useState<ExerciseModel[]>([]);

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
      exercises: [],
    },
  });

  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: "exercises",
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const onInvalid = (data: any) => {
    console.log(data);
  };

  const { exerciseRepository, workoutRepository, exerciseSetRepository } =
    useDatabase();

  const validWorkout = fields.length !== 0;

  useEffect(() => {
    async function queryExercises() {
      setLoading(true);

      const exercises = await exerciseRepository.getAll();

      setExercises(exercises);
      setLoading(false);
    }

    queryExercises();
  }, []);

  const addExerciseHandler = (exercise: ExerciseModel) => {
    append({ ...exercise, exerciseSets: [{ ...DEFAULT_SET }] });

    setShowModal(false);
  };

  const saveWorkout = async () => {
    try {
      // Create the new workout
      let workoutEntity = await workoutRepository.create(
        getValues("workoutName"),
        availableExercises
      );

      // Create and store the sets linked to both the workout and the exercise (Cascade)
      const exerciseSetEntities = getValues("exercises").map((exercise, _) => [
        ...exercise.exerciseSets.map((set, index) => ({
          ...set,
          exercise: { ...exercise, workouts: [workoutEntity] },
          workout: workoutEntity,
          position: index,
        })),
      ]);

      const savedSetEntities = await exerciseSetRepository.create(
        exerciseSetEntities as any
      );
      workoutEntity.sets = savedSetEntities;
      workoutEntity = await workoutRepository.save(workoutEntity);
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  // Only show exercises that haven't already been picked
  const availableExercises = useMemo(
    () =>
      exercises.filter(
        (exercise) =>
          !(getValues("exercises") as any).some((item: any) => {
            return item.id === exercise.id;
          })
      ),
    [exercises, getValues]
  );

  return (
    <>
      <ScrollView fullscreen>
        <YStack height="100%" w="100%" space="$4">
          <Heading size="$10" style={styles.header}>
            Create Workout
          </Heading>
          <Controller
            name={`workoutName`}
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Leg Day"
                onChangeText={onChange}
                value={value}
                size="$5"
              />
            )}
          />

          <Button
            disabled={isLoading}
            onPress={() => setShowModal(true)}
            bg="blue"
            icon={<FontAwesome5 name="dumbbell" size={16} color="white" />}
          >
            Add Exercise
          </Button>
          <Stack>
            {fields.map((item, index) => (
              <ExerciseSetCard
                exerciseName={item.name}
                exerciseIndex={index}
                key={item.id}
                {...{ control }}
              />
            ))}
          </Stack>
          {validWorkout && (
            <YStack position="absolute" bottom={0} width="100%" height={50}>
              <Button
                disabled={isLoading}
                onPress={handleSubmit(onSubmit, onInvalid)}
                bg="blue"
              >
                Save Workout
              </Button>
            </YStack>
          )}
        </YStack>
      </ScrollView>
      {showModal && (
        <ExercisePicker
          exercises={availableExercises}
          onClose={() => setShowModal(false)}
          onSubmit={addExerciseHandler}
        />
      )}
    </>
  );
}

export default AddWorkoutModal;

// ─── Styles ────────────────────────────────────────────────────────────── ✣ ─

const styles = StyleSheet.create({
  header: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

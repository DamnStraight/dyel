import ExercisePicker from "@App/components/ExercisePicker";
import { ExerciseModel } from "@App/data/entities/Exercise";
import { useDatabase } from "@App/hooks/useDatabase";
import { RootWorkoutStackParamList } from "@App/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { SafeAreaView, StyleSheet } from "react-native";
import { Button, H1, H4, Input, ScrollView, XStack, YStack } from "tamagui";
import ExerciseSetCard from "../../../components/ExerciseSetCard";
import { useBoundStore } from "../../../store";
import { AddWorkoutFormValues, DEFAULT_SET } from "./types";

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
function AddWorkoutModal({ navigation, route }: AddWorkoutProps) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const { exercises, addWorkout } = useBoundStore(
    ({ exercises, addWorkout }) => ({ exercises, addWorkout })
  );

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

  const onSubmit = async (data: AddWorkoutFormValues) => {
    await saveWorkout(data);
    reset();
    navigation.goBack();
  };

  const onInvalid = (data: any) => {
    console.log(data);
  };

  const { exerciseRepository, workoutRepository, exerciseSetRepository } =
    useDatabase();

  const validWorkout = fields.length !== 0;

  const addExerciseHandler = (exercise: ExerciseModel) => {
    append({ ...exercise, exerciseSets: [{ ...DEFAULT_SET }] });

    setShowModal(false);
  };

  const saveWorkout = async (formData: AddWorkoutFormValues) => {
    const { workoutName, exercises: formExercises } = formData;
    try {
      // Create the new workout
      let workoutEntity = await workoutRepository.create(
        workoutName,
        availableExercises
      );

      // Create and store the sets linked to both the workout and the exercise (Cascade)
      const exerciseSetEntities = formExercises.flatMap((exercise, _) => [
        ...exercise.exerciseSets.map((set, index) => ({
          ...set,
          exercise: { ...exercise, workouts: [workoutEntity] },
          workout: workoutEntity,
          position: index + 1,
        })),
      ]);

      const savedSetEntities = await exerciseSetRepository.create(
        exerciseSetEntities as any
      );

      workoutEntity.sets = savedSetEntities;
      workoutEntity.exercises = exercises
      workoutEntity = await workoutRepository.save(workoutEntity);

      await addWorkout(workoutEntity);
    } catch (e) {
      console.log(e);
    }
  };

  // Only show exercises that haven't already been picked
  const availableExercises = exercises.filter(
    (exercise) =>
      !(getValues("exercises") as any).some((item: any) => {
        return item.id === exercise.id;
      })
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <XStack p="$2">
        {/* <Button
          als="center"
          justifyContent="center"
          h={50}
          w={50}
          onPress={() => navigation.goBack()}
          icon={<Entypo name="chevron-left" size={20} color="black" />}
          animation="bouncy"
          pressStyle={{ bg: "$zinc200", scale: 0.96 }}
        >
          {" "}
        </Button> */}
        <H1 flex={1} textAlign="center" color="$zinc200" style={styles.header}>
          Create Workout
        </H1>
      </XStack>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <YStack height="100%" w="100%" space="$4" p="$4">
          <YStack bg="$zinc200" borderRadius={25} p="$4" space="$2">
            <H4>Workout Name:</H4>
            {/* <Label bg="red" htmlFor="workoutName">Workout Name:</Label> */}
            <Controller
              name={`workoutName`}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Leg Day"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </YStack>
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
      </ScrollView>
      <YStack p="$4" w="100%" space="$3">
        <ExercisePicker
          exercises={availableExercises}
          onSubmit={addExerciseHandler}
        />
        <XStack space="$3">
          {/* TODO Add Confirmation dialog if data is set */}
          <Button
            flex={0.5}
            size="$5"
            h={50}
            borderRadius={10}
            disabled={isLoading}
            onPress={() => {
              reset();
              navigation.goBack();
            }}
            theme="red_Button"
          >
            Cancel
          </Button>
          <Button
            flex={0.5}
            size="$5"
            h={50}
            borderRadius={10}
            disabled={validWorkout && isLoading}
            onPress={handleSubmit(onSubmit, onInvalid)}
            theme="green_Button"
          >
            Save Workout
          </Button>
        </XStack>
      </YStack>
    </SafeAreaView>
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

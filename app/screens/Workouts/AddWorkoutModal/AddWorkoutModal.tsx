import ExercisePicker from "@App/components/ExercisePicker";
import { ExerciseModel } from "@App/data/entities/Exercise";
import { useDatabase } from "@App/hooks/useDatabase";
import { FontAwesome5 } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootWorkoutStackParamList } from "@Root/Navigation";
import {
  Box,
  Button,
  Heading,
  Input,
  ScrollView,
  Stack,
  View,
} from "native-base";
import { useEffect, useMemo, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import ExerciseSetCard from "../../../components/ExerciseSetCard";
import { ExerciseSetModel, SetType } from "../../../data/entities/ExerciseSet";

// ─── Component & Props ─────────────────────────────────────────────────── ✣ ─
// prettier-ignore
interface AddWorkoutProps extends NativeStackScreenProps<RootWorkoutStackParamList, "AddWorkoutModal"> {}

export const DEFAULT_SET: Set = { weight: "", reps: "", type: SetType.REGULAR };

interface ExerciseSetDto
  extends Omit<ExerciseModel, "workouts" | "exerciseSets"> {
  exerciseSets: Set[];
}

export interface Set extends Pick<ExerciseSetModel, 'type'> {
  // Type these as string for Form input handling
  weight: string;
  reps: string;
}

export interface FormValues {
  workoutName: string;
  exercises: ExerciseSetDto[];
}

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
  } = useForm<FormValues>({
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
      const exerciseSetEntities = getValues("exercises").map(
        (exercise, index) => [
          ...exercise.exerciseSets.map((set, index) => ({
            ...set,
            exercise: { ...exercise, workouts: [workoutEntity] },
            workout: workoutEntity,
            position: index,
          })),
        ]
      );

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
    <Box>
      <ScrollView w="full" h="full">
        <View p="4">
          <Stack w="full" space="4">
            <Heading size="3xl" style={styles.header}>
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
                  size="xl"
                />
              )}
            />

            <Button
              isLoading={isLoading}
              onPress={() => setShowModal(true)}
              bg="violet.600"
              leftIcon={
                <FontAwesome5 name="dumbbell" size="sm" color="white" />
              }
            >
              Add Exercise
            </Button>
            {fields.map((item, index) => (
              <ExerciseSetCard
                exerciseName={item.name}
                exerciseIndex={index}
                key={item.id}
                {...{ control }}
              />
            ))}
            {validWorkout && (
              <Button
                isLoading={isLoading}
                onPress={handleSubmit(onSubmit, onInvalid)}
                bg="violet.600"
                leftIcon={
                  <FontAwesome5 name="dumbbell" size="sm" color="white" />
                }
              >
                Save Workout
              </Button>
            )}
          </Stack>
        </View>
      </ScrollView>
      {showModal && (
        <ExercisePicker
          exercises={availableExercises}
          onClose={() => setShowModal(false)}
          onSubmit={addExerciseHandler}
        />
      )}
    </Box>
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

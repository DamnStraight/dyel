import ExercisePicker from "@App/components/ExercisePicker";
import { ExerciseModel } from "@App/data/entities/Exercise";
import { useDatabase } from "@App/hooks/useDatabase";
import { FontAwesome5 } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootWorkoutStackParamList } from "@Root/Navigation";
import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  ScrollView,
  Stack,
  View,
  WarningOutlineIcon
} from "native-base";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import ExerciseSetCard from "../../../components/ExerciseSetCard";
import { ExerciseSetModel, SetType } from "../../../data/entities/ExerciseSet";

// ─── Component & Props ─────────────────────────────────────────────────── ✣ ─
// prettier-ignore
interface AddWorkoutProps extends NativeStackScreenProps<RootWorkoutStackParamList, "AddWorkoutModal"> {}

export interface ExerciseSet
  extends Omit<
    ExerciseSetModel,
    "id" | "workoutSet" | "position" | "exercise" | "workout"
  > {}

const DEFAULT_SET: ExerciseSet = { weight: 1, reps: 6, type: SetType.REGULAR };

/*
  TODO:
    - Reposition 'Add Exercise' and 'save Workout' buttons
    - Create a better Set type picker
    - Fix Set Type numbering
    - Add haptic feedback to UI
    - Resize elements to be more mobile ergonomic  
*/
function AddWorkoutModal({ navigation }: AddWorkoutProps) {
  const [workoutItems, setWorkoutItems] = useState<ExerciseModel[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [exercises, setExercises] = useState<ExerciseModel[]>([]);
  const [exerciseSets, setExerciseSets] = useState<ExerciseSet[][]>([]);
  const [workoutName, setWorkoutName] = useState<string>("");

  const { exerciseRepository, workoutRepository, exerciseSetRepository } =
    useDatabase();

  const validWorkout = workoutItems.length !== 0;

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
    setWorkoutItems([...workoutItems, { ...exercise }]);

    setExerciseSets([...exerciseSets, [DEFAULT_SET]]);

    setShowModal(false);
  };

  const saveWorkout = async () => {
    try {
      // Create the new workout
      let workoutEntity = await workoutRepository.create(workoutName, exercises);

      // Create and store the sets linked to both the workout and the exercise (Cascade)
      const exerciseSetEntities = workoutItems
        .map((exercise, index) => [
          ...exerciseSets[index].map((set, index) => ({
            ...set,
            exercise: { ...exercise, workouts: [workoutEntity] },
            workout: workoutEntity,
            position: index,
          })),
        ])
        .flat();

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

  const addSetHandler = (index: number) => {
    /**
     * TODO:
     * - Exercises should keep track of a pb (Or allow a user to set a 'default' weight)
     */
    let setClone = [...exerciseSets];

    let newSet: ExerciseSet;
    if (exerciseSets[index].length !== 0) {
      const lastIndex = exerciseSets[index].length - 1;
      newSet = { ...exerciseSets[index][lastIndex], type: SetType.REGULAR };
    } else {
      newSet = { reps: 6, weight: 1, type: SetType.REGULAR };
    }

    setClone[index].push(newSet);

    setExerciseSets(setClone);
  };

  const changeRepHandler =
    (exerciseIndex: number, setIndex: number) => (value: string) => {
      let setClone = [...exerciseSets];
      let modifiedSet = setClone[exerciseIndex][setIndex];

      setClone[exerciseIndex][setIndex] = {
        ...modifiedSet,
        reps: Number(value.replace(/^0+/, "")),
      };

      setExerciseSets(setClone);
    };

  const changeWeightHandler =
    (exerciseIndex: number, setIndex: number) => (value: string) => {
      let setClone = [...exerciseSets];
      let modifiedSet = setClone[exerciseIndex][setIndex];

      setClone[exerciseIndex][setIndex] = {
        ...modifiedSet,
        weight: Number(value),
      };

      setExerciseSets(setClone);
    };

  const changeTypeHandler =
    (exerciseIndex: number, setIndex: number) => (value: string) => {
      let setClone = [...exerciseSets];
      let modifiedSet = setClone[exerciseIndex][setIndex];

      setClone[exerciseIndex][setIndex] = {
        ...modifiedSet,
        type: value as SetType,
      };

      setExerciseSets(setClone);
    };

  return (
    <Box>
      <ScrollView w="full" h="full">
        <View p="4">
          <Stack w="full" space="4">
            <Heading size="3xl" style={styles.header}>
              Create Workout
            </Heading>
            <FormControl isRequired>
              <FormControl.Label>Workout Name</FormControl.Label>
              <Input placeholder="Leg Day" onChangeText={(value) => setWorkoutName(value)} size="xl" />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                That workout name already exists!
              </FormControl.ErrorMessage>
            </FormControl>
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
            {workoutItems.map((item, index) => (
              <ExerciseSetCard
                key={index}
                exerciseIndex={index}
                exercise={item}
                onAddSet={addSetHandler}
                exerciseSets={exerciseSets[index]}
                onRepChange={changeRepHandler}
                onWeightChange={changeWeightHandler}
                onTypeChange={changeTypeHandler}
              />
            ))}
            {validWorkout && (
              <Button
                isLoading={isLoading}
                onPress={saveWorkout}
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
          exercises={exercises.filter(
            (exercise) => !workoutItems.some((item) => item.id === exercise.id)
          )}
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

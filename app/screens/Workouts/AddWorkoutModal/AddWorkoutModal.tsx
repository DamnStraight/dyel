import ExercisePicker from "@App/components/ExercisePicker";
import { ExerciseModel } from "@App/data/entities/Exercise";
import { useDatabase } from "@App/hooks/useDatabase";
import { FontAwesome5 } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootWorkoutStackParamList } from "@Root/Navigation";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Heading,
  Input,
  ScrollView,
  Select,
  Stack,
  View,
  VStack,
  WarningOutlineIcon
} from "native-base";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

interface ExerciseCardProps {
  exerciseIndex: number;
  exercise: WorkoutExercise;
  exerciseSets: ExerciseSet[];
  onAddSet: (index: number) => void;
  onRepChange: (exerciseIndex: number,setIndex: number) => (value: string) => void;
  onWeightChange: (exerciseIndex: number,setIndex: number) => (value: string) => void;
  onTypeChange: (exerciseIndex: number,setIndex: number) => (value: string) => void;
}

function ExerciseCard({
  exerciseIndex,
  exercise,
  onAddSet,
  exerciseSets,
  onRepChange,
  onWeightChange,
  onTypeChange,
}: ExerciseCardProps) {
  const [sets, setSets] = useState<ExerciseSet[]>([]);

  // Keep track 
  let setCounter = 1;

  return (
    <>
      <Box
        borderWidth="1"
        shadow="6"
        borderColor="gray.700"
        bg="gray.900"
        p="2"
        borderRadius="lg"
      >
        <VStack space={4}>
          <Center>
            <Heading>{exercise.name}</Heading>
          </Center>
          <Flex direction="row" h="6">
            <Box flex={1} mx="1">
              <Heading size="sm" textAlign="center">
                Set
              </Heading>
            </Box>
            <Box flex={1} mx="1">
              <Heading size="sm" textAlign="center">
                kg
              </Heading>
            </Box>
            <Box flex={1} mx="1">
              <Heading size="sm" textAlign="center">
                Reps
              </Heading>
            </Box>
          </Flex>
          {exerciseSets &&
            exerciseSets.map((item, index) => (
              <Flex direction="row" h="10" key={`set-${index}`}>
                {/* <Button size="md" flex={1}>W</Button> */}
                <Select
                  flex={1}
                  selectedValue={item.type}
                  h="full"
                  textAlign="center"
                  dropdownIcon={<></>}
                  borderColor="violet.500"
                  mx="1"
                  onValueChange={onTypeChange(exerciseIndex, index)}
                >
                  <Select.Item label="WARMUP" value="WARMUP" />
                  <Select.Item
                    label={String(
                      item.type === "REGULAR" ? setCounter++ : "REGULAR"
                    )}
                    value="REGULAR"
                  />
                  <Select.Item
                    label="DROP"
                    _text={{ fontWeight: "bold", color: "white" }}
                    value="DROP"
                  />
                </Select>
                <Input
                  bg="gray.800"
                  keyboardType="number-pad"
                  size="md"
                  textAlign="center"
                  flex={1}
                  mx="1"
                  value={String(item.weight)}
                  onChangeText={onWeightChange(exerciseIndex, index)}
                />
                <Input
                  keyboardType="number-pad"
                  size="md"
                  textAlign="center"
                  flex={1}
                  mx="1"
                  value={String(item.reps)}
                  onChangeText={onRepChange(exerciseIndex, index)}
                />
              </Flex>
            ))}
          <Button
            leftIcon={<FontAwesome5 name="plus" size="sm" color="white" />}
            bg="violet.600"
            onPress={() => onAddSet(exerciseIndex)}
          >
            Set
          </Button>
        </VStack>
      </Box>
    </>
  );
}

// ─── Component & Props ─────────────────────────────────────────────────── ✣ ─
// prettier-ignore
interface AddWorkoutProps extends NativeStackScreenProps<RootWorkoutStackParamList, "AddWorkoutModal"> {}

type SetType = "WARMUP" | "REGULAR" | "DROP";

type ExerciseSet = {
  type: SetType;
  reps: number;
  weight: number;
};

interface WorkoutExercise extends Pick<ExerciseModel, "id" | "name"> {
  sets: ExerciseSet[];
}

const DEFAULT_SET: ExerciseSet = { weight: 1, reps: 6, type: 'REGULAR' };

function AddWorkoutModal() {
  const [workoutItems, setWorkoutItems] = useState<WorkoutExercise[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [exercises, setExercises] = useState<ExerciseModel[]>([]);
  const [exerciseSets, setExerciseSets] = useState<ExerciseSet[][]>([]);

  const { exerciseRepository } = useDatabase();

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
    setWorkoutItems([
      ...workoutItems,
      { ...exercise, sets: [] } as WorkoutExercise,
    ]);

    setExerciseSets([...exerciseSets, [DEFAULT_SET]]);

    setShowModal(false);
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
      newSet = { ...exerciseSets[index][lastIndex], type: "REGULAR" };
    } else {
      newSet = { reps: 6, weight: 1, type: "REGULAR" };
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
              <Input placeholder="Leg Day" size="xl" />
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
              <ExerciseCard
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

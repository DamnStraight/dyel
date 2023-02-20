import { FontAwesome5 } from "@expo/vector-icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Select,
  VStack,
} from "native-base";
import { ExerciseSet } from "@App/screens/Workouts/AddWorkoutModal/AddWorkoutModal";
import { ExerciseModel } from "@App/data/entities/Exercise";

interface ExerciseCardProps {
  exerciseIndex: number;
  exercise: ExerciseModel;
  exerciseSets: ExerciseSet[];
  onAddSet: (index: number) => void;
  onRepChange: (
    exerciseIndex: number,
    setIndex: number
  ) => (value: string) => void;
  onWeightChange: (
    exerciseIndex: number,
    setIndex: number
  ) => (value: string) => void;
  onTypeChange: (
    exerciseIndex: number,
    setIndex: number
  ) => (value: string) => void;
}

function ExerciseSetCard({
  exerciseIndex,
  exercise,
  onAddSet,
  exerciseSets,
  onRepChange,
  onWeightChange,
  onTypeChange,
}: ExerciseCardProps) {
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

export default ExerciseSetCard;

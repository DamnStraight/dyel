import {
  DEFAULT_SET, FormValues, Set
} from "@App/screens/Workouts/AddWorkoutModal/AddWorkoutModal";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Select,
  VStack
} from "native-base";
import {
  Control,
  Controller,
  useFieldArray
} from "react-hook-form";

interface ExerciseCardProps {
  exerciseName: string;
  exerciseIndex: number;
  control: Control<FormValues>;
}

const ExerciseSetCard = ({
  exerciseName,
  exerciseIndex,
  control,
}: ExerciseCardProps) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `exercises.${exerciseIndex}.exerciseSets`,
  });

  const addSetHandler = () => {
    let newSet: Set = DEFAULT_SET;

    // If the user has sets defined, copy the last one
    if (fields.length > 0) {
      const { reps, weight } = fields[0];
      newSet = { ...newSet, reps, weight };
    }

    append(newSet);
  };

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
            <Heading>{exerciseName}</Heading>
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
          {fields.map((item, index) => (
            <Flex direction="row" h="10" key={item.id}>
              <Controller
                name={`exercises.${exerciseIndex}.exerciseSets.${index}.type`}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    flex={1}
                    h="full"
                    textAlign="center"
                    dropdownIcon={<></>}
                    borderColor="violet.500"
                    defaultValue={item.type}
                    onValueChange={(value) => {
                      onChange(value);
                    }}
                    selectedValue={value}
                    mx="1"
                  >
                    <Select.Item label="WARMUP" value="WARMUP" />
                    <Select.Item
                      label={String(
                        item.type === "REGULAR" ? index + 1 : "REGULAR"
                      )}
                      value="REGULAR"
                    />
                    <Select.Item
                      label="DROP"
                      _text={{ fontWeight: "bold", color: "white" }}
                      value="DROP"
                    />
                  </Select>
                )}
              />
              <Controller
                name={`exercises.${exerciseIndex}.exerciseSets.${index}.weight`}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    bg="gray.800"
                    keyboardType="numeric"
                    size="md"
                    textAlign="center"
                    flex={1}
                    mx="1"
                    onChangeText={onChange}
                    value={value}
                    defaultValue={item.weight}
                    placeholder={"0"}
                  />
                )}
              />
              <Controller
                name={`exercises.${exerciseIndex}.exerciseSets.${index}.reps`}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    bg="gray.800"
                    keyboardType="numeric"
                    size="md"
                    textAlign="center"
                    flex={1}
                    mx="1"
                    onChangeText={onChange}
                    value={value}
                    defaultValue={item.reps}
                    placeholder={"0"}
                  />
                )}
              />
            </Flex>
          ))}
          <Button
            leftIcon={<FontAwesome5 name="plus" size="sm" color="white" />}
            bg="violet.600"
            onPress={addSetHandler}
          >
            Set
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default ExerciseSetCard;

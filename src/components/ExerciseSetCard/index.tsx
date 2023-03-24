import { FontAwesome5 } from "@expo/vector-icons";
import { Control, Controller, useFieldArray } from "react-hook-form";
import {
  Button,
  Heading,
  Input,
  Stack,
  XStack,
  YStack,
  Select,
  Sheet,
  Adapt,
} from "tamagui";
import { SetType } from "../../data/entities/ExerciseSet";
import {
  AddWorkoutFormValues,
  DEFAULT_SET,
  Set,
} from "../../screens/Workouts/AddWorkoutModal/types";
import { Entypo } from "@expo/vector-icons";

interface ExerciseCardProps {
  exerciseName: string;
  exerciseIndex: number;
  control: Control<AddWorkoutFormValues>;
}

const options = [
  { name: SetType.DROP },
  { name: SetType.REGULAR },
  { name: SetType.WARMUP },
];

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
    <YStack bg="$zinc200" p={15} borderRadius={20} spaceDirection="vertical" space="$2">
      <Heading height={30} textAlign="center">
        {exerciseName}
      </Heading>
      <XStack h={30}>
        <Stack flex={0.33}>
          <Heading size="$5" textAlign="center">
            Set
          </Heading>
        </Stack>
        <Stack flex={0.33}>
          <Heading size="$5" textAlign="center">
            kg
          </Heading>
        </Stack>
        <Stack flex={0.33}>
          <Heading size="$5" textAlign="center">
            Reps
          </Heading>
        </Stack>
      </XStack>
      {fields.map((item, index) => (
        <XStack h={50} key={item.id} space="$2">
          <Controller
            name={`exercises.${exerciseIndex}.exerciseSets.${index}.type`}
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Select
                defaultValue={item.type}
                onValueChange={(value) => {
                  onChange(value);
                }}
                value={value}
              >
                <Select.Trigger
                  flex={0.33}
                  h={20}
                >
                  <Select.Value placeholder="Something" />
                </Select.Trigger>
                <Adapt when="sm" platform="touch">
                  <Sheet modal dismissOnSnapToBottom>
                    <Sheet.Frame>
                      <Sheet.ScrollView>
                        <Adapt.Contents />
                      </Sheet.ScrollView>
                    </Sheet.Frame>
                    <Sheet.Overlay />
                  </Sheet>
                </Adapt>
                <Select.Content zIndex={200000}>
                  <Select.Viewport bg="orange">
                    <Select.Group>
                      <Select.Label>{"Set Type"}</Select.Label>
                      {options.map((item, i) => {
                        return (
                          <Select.Item
                            index={i}
                            key={item.name}
                            value={item.name}
                          >
                            <Select.ItemText>{item.name}</Select.ItemText>
                          </Select.Item>
                        );
                      })}
                    </Select.Group>
                  </Select.Viewport>
                </Select.Content>
              </Select>
            )}
          />
          <Controller
            name={`exercises.${exerciseIndex}.exerciseSets.${index}.weight`}
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Input
                keyboardType="numeric"
                size="$5"
                textAlign="center"
                flex={0.33}
                onChangeText={onChange}
                value={String(value)}
                defaultValue={String(item.weight)}
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
                keyboardType="numeric"
                size="$5"
                textAlign="center"
                flex={0.33}
                onChangeText={onChange}
                value={String(value)}
                defaultValue={String(item.reps)}
                placeholder={"0"}
              />
            )}
          />
        </XStack>
      ))}
      <XStack>
        <Button
          w="100%"
          bg="$indigo500"
          color="white"
          onPress={addSetHandler}
          pressStyle={{ bg: "$indigo700"}}
          animation="quick"
        >
          Set
        </Button>
      </XStack>
    </YStack>
  );
};

export default ExerciseSetCard;

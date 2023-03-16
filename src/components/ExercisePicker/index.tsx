import { ExerciseModel } from "@App/data/entities/Exercise";
import { useState } from "react";
import {
  FlatList,
  ListRenderItem,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Button, Dialog, Heading, Stack, Text, YStack } from "tamagui";

type ExercisePickerProps = {
  onSubmit: (exercise: ExerciseModel) => void;
  onClose: () => void;
  exercises: ExerciseModel[];
};

function ExercisePicker({
  onClose,
  onSubmit,
  exercises = [],
}: ExercisePickerProps) {
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null);

  const renderItem: ListRenderItem<ExerciseModel> = ({ item, index }) => (
    <Pressable
      onPress={() => {
        setSelectedExercise(index);
      }}
    >
      <Stack
        p={5}
        h={50}
        borderRadius={30}
        bg={selectedExercise === index ? "red" : "blue"}
        my={5}
      >
        <Stack>
          <Heading size="$5" color="black">
            {item.name}
          </Heading>
          <Text>Sample description blabla</Text>
        </Stack>
      </Stack>
    </Pressable>
  );

  return (
    <Dialog modal open={true} onOpenChange={onClose}>
      {/* <Adapt when="xl" platform="native">
        <Sheet zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" space>
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay />
        </Sheet>
      </Adapt> */}
      <Dialog.Portal my={150} mx={25}>
        <Dialog.Content
          borderRadius={25}
          marginTop={75}
          elevate
          w="100%"
          h="100%"
          key="content"
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          space
        >
          <YStack flex={1} bg="blue">
            <Dialog.Title>Exercises</Dialog.Title>
            <Stack flex={1} bg="red">
                          <FlatList
              data={exercises}
              renderItem={renderItem}
              keyExtractor={(item) => String(item.id)}
            />
            </Stack>

            <Stack position="absolute" bottom={0} width="100%">
              <Button onPress={onClose}>Cancel</Button>
              <Button
                disabled={selectedExercise === null}
                onPress={() => {
                  onSubmit(exercises[selectedExercise!]);
                }}
              >
                Save
              </Button>
            </Stack>
          </YStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

export default ExercisePicker;

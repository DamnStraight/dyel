import { StaticModal as Modal } from "@App/components/StaticModal";
import { ExerciseModel } from "@App/data/entities/Exercise";
import {
  Box,
  Button,
  Center,
  FlatList,
  Heading,
  Pressable, Stack,
  Text
} from "native-base";
import { useState } from "react";
import { ListRenderItem } from "react-native";

type ExercisePickerProps = {
  onSubmit: (exercise: ExerciseModel) => void;
  onClose: () => void;
  exercises: ExerciseModel[];
};

function ExercisePicker({ onClose, onSubmit, exercises = [] }: ExercisePickerProps) {
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null);

  const renderItem: ListRenderItem<ExerciseModel> = ({ item, index }) => (
    <Pressable
      onPress={() => {
        setSelectedExercise(index);
      }}
    >
      <Box
        w="full"
        p="3"
        rounded="lg"
        bg={selectedExercise === index ? "violet.400" : "gray.700"}
        shadow="2"
        my="1"
      >
        <Stack>
          <Heading size="md">{item.name}</Heading>
          <Text>Sample description blabla</Text>
        </Stack>
      </Box>
    </Pressable>
  );

  return (
    <Center>
      <Modal isOpen={true} onClose={onClose}>
        <Modal.Content w="90%" maxH="80%">
          <Modal.Body maxH="500px">
            <>
              <Heading>Exercises</Heading>
              <FlatList
                data={exercises}
                renderItem={renderItem}
                keyExtractor={(item) => String(item.id)}
              ></FlatList>
            </>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
                Cancel
              </Button>
              <Button
                disabled={selectedExercise === null}
                onPress={() => {
                  onSubmit(exercises[selectedExercise!]);
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
}

export default ExercisePicker;

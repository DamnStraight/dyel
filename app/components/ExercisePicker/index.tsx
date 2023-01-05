import { ExerciseModel } from "@App/data/entities/Exercise";
import { useDatabase } from "@App/hooks/useDatabase";
import {
  Box,
  Button,
  Center,
  FlatList,
  Heading,
  Spinner,
  Stack,
  Text,
} from "native-base";
import { useEffect, useState } from "react";
import { ListRenderItem } from "react-native";
import { StaticModal as Modal } from "../StaticModal";

type ExercisePickerProps = {
  onSubmit: (exercise: ExerciseModel) => void;
  onClose: () => void;
  isOpen: boolean;
};

function ExercisePicker({ onClose, onSubmit, isOpen }: ExercisePickerProps) {
  const { exerciseRepository } = useDatabase();
  const [exercises, setExercises] = useState<ExerciseModel[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [selectedExercise, setSelectedExercise] =
    useState<ExerciseModel | null>(null);

  useEffect(() => {
    async function queryExercises() {
      setLoading(true);

      const exercises = await exerciseRepository.getAll();

      setExercises(exercises);
      setLoading(false);
    }

    queryExercises();
  }, []);

  const renderItem: ListRenderItem<ExerciseModel> = ({ item }) => (
    <Box
      w="full"
      p="3"
      rounded="lg"
      _dark={{ backgroundColor: "gray.700", borderColor: "coolGray.600" }}
      shadow="2"
      my="1"
    >
      <Stack>
        <Heading size="md">{item.name}</Heading>
        <Text>Sample description blabla</Text>
      </Stack>
    </Box>
  );

  return (
    <Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content w="90%" maxH="80%">
          <Modal.Body maxH="500px">
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <Heading>Exercises</Heading>
                <FlatList
                  data={exercises}
                  renderItem={renderItem}
                  keyExtractor={(item) => String(item.id)}
                ></FlatList>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
                Cancel
              </Button>
              <Button
                disabled={selectedExercise === null}
                onPress={() => {
                  onSubmit(selectedExercise!);
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

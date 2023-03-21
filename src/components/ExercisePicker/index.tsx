import { ExerciseModel } from "@App/data/entities/Exercise";
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigatorProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { useState } from "react";
import { FlatList, ListRenderItem } from "react-native";
import { Button, Dialog, H3, H4, Input, Stack, XStack, YStack } from "tamagui";
import { RootTabParamList } from "../../navigation";
import FAB from "../FAB";

type ExercisePickerProps = {
  onSubmit: (exercise: ExerciseModel) => void;
  exercises: ExerciseModel[];
};

function ExercisePicker({ onSubmit, exercises = [] }: ExercisePickerProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null);
  const [search, setSearch] = useState<string>("");
  const navigation = useNavigation<NavigationProp<RootTabParamList>>();

  const handleNavigateToExercise = () => {
    setOpen(false);
    navigation.navigate("Exercises", { screen: "ExerciseScreen" });
  };

  const renderItem: ListRenderItem<ExerciseModel> = ({ item, index }) => (
    <Stack
      mt={index === 0 ? 0 : "$2"}
      p="$3"
      borderRadius={10}
      bg={selectedExercise === index ? "$indigo500" : "$zinc200"}
      onPress={() => {
        const thisSelected = selectedExercise === index;
        setSelectedExercise(thisSelected ? null : index);
      }}
    >
      <H4 color="black" textAlign="center">
        {item.name}
      </H4>
    </Stack>
  );

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        {/* <FAB stackStyle={{ mr: 30, mb: 75 }} color="$indigo700" iconColor="white" /> */}
        <Button size="$5" h={50} color="white" bg="$indigo700">
          Add Exercise
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal py={150} px={25}>
        <Dialog.Overlay
          zIndex={1}
          onPress={() => setOpen(false)}
          bg="$zinc900"
          key="overlay"
          animation="quick"
          o={0.8}
          enterStyle={{ o: 0 }}
          exitStyle={{ o: 0 }}
        />
        <Dialog.Content
          zIndex={2}
          borderRadius={20}
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
          <YStack flex={1} space="$3">
            <Dialog.Title>Exercises</Dialog.Title>
            <YStack flex={1} my="$2" space="$2">
              {exercises.length === 0 ? (
                <Stack flex={1} justifyContent="center">
                  <H3
                    color="$zinc600"
                    opacity={0.3}
                    textAlign="center"
                  >{`Nothing here... :(`}</H3>
                  <Button onPress={handleNavigateToExercise}>
                    Add Exercise
                  </Button>
                </Stack>
              ) : (
                <FlatList
                  data={exercises.filter((exercise) =>
                    exercise.name.toLowerCase().includes(search.toLowerCase())
                  )}
                  renderItem={renderItem}
                  keyExtractor={(item) => String(item.id)}
                />
              )}
            </YStack>
            <Stack>
              <Input
                placeholder="Search..."
                textAlign="center"
                borderWidth={0}
                value={search}
                onChangeText={(value) => setSearch(value)}
              />
            </Stack>
            <XStack space="$2">
              <Button
                flex={0.5}
                onPress={() => setOpen(false)}
                theme="red_Button"
              >
                Cancel
              </Button>
              <Button
                theme="green_Button"
                flex={0.5}
                disabled={selectedExercise === null}
                onPress={() => {
                  onSubmit(exercises[selectedExercise!]);
                  setSelectedExercise(null);
                  setOpen(false);
                }}
              >
                Add
              </Button>
            </XStack>
          </YStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

export default ExercisePicker;

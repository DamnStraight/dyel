import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootWorkoutStackParamList } from "@Root/Navigation";
import { StyleSheet } from "react-native";
import { useDatabase } from "@App/hooks/useDatabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Stack,
  WarningOutlineIcon,
  View,
  ScrollView,
  TextArea,
  Modal,
} from "native-base";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import ExercisePicker from "@App/components/ExercisePicker";
import { ExerciseModel } from "@App/data/entities/Exercise";

// ─── Form ──────────────────────────────────────────────────────────────── ✣ ─

const WorkoutSchema = z.object({
  name: z.string().min(1).max(30),
});

type FormData = z.infer<typeof WorkoutSchema>;

const defaultValues: Readonly<FormData> = {
  name: "",
};

// ─── Component & Props ─────────────────────────────────────────────────── ✣ ─
// prettier-ignore
interface AddWorkoutProps extends NativeStackScreenProps<RootWorkoutStackParamList, "AddWorkoutModal"> {}

interface Workout {}

function AddWorkoutModal() {
  const [workoutItems, setWorkoutItems] = useState<ExerciseModel[]>([]);
  const [showModal, setShowModal] = useState(false);

  const addExerciseHandler = (exercise: ExerciseModel) => {
    setWorkoutItems([...workoutItems, exercise]);
    setShowModal(false);
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
              onPress={() => setShowModal(true)}
              leftIcon={
                <FontAwesome5 name="dumbbell" size="sm" color="white" />
              }
            >
              Add Exercise
            </Button>
            {workoutItems.map((item, index) => (
              <Box key={index}>
                <Heading>{item.name}</Heading>
              </Box>
            ))}
          </Stack>
        </View>
      </ScrollView>
      {showModal && (
        <ExercisePicker
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

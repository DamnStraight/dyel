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
import ExercisePicker from "../../../components/ExercisePicker";

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

function AddWorkoutModal() {
  const [workoutItems, setWorkoutItems] = useState<any>();
  const [showModal, setShowModal] = useState(false);

  return (
    <Box>
      <ScrollView w="full" h="full">
        <View p="4">
          <Stack w="full" space="4">
            <Heading size="3xl" style={styles.header}>
              Create Workout
            </Heading>
            <FormControl isRequired isInvalid>
              <FormControl.Label>Workout Name</FormControl.Label>
              <Input placeholder="Leg Day" size="xl" />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                That workout name already exists!
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl>
              <FormControl.Label>Description</FormControl.Label>
              <TextArea
                h={20}
                placeholder="Leg Day"
                autoCompleteType={undefined}
                size="xl"
              />
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
          </Stack>
        </View>
      </ScrollView>
      <ExercisePicker
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(exercise) => console.log(exercise)}
      />
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

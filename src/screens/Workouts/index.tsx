import { WorkoutModel } from "@App/data/entities/Workout";
import { RootWorkoutStackParamList } from "@App/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { RefreshControl, SafeAreaView } from "react-native";
import { H2, ScrollView, Stack, YStack } from "tamagui";
import { ConfirmationDialog } from "../../components/ConfirmationDialog";
import FAB from "../../components/FAB";
import { ScreenHeader } from "../../components/ScreenHeader";
import { useBoundStore } from "../../store";

// ─── Component & Props ─────────────────────────────────────────────────── ✣ ─
function WorkoutCard({ name }: Pick<WorkoutModel, "name">) {
  return (
    <YStack
      padding={15}
      borderRadius={15}
      elevation={5}
      bg="white"
      animation="bouncy"
      // height={100}
    >
      <YStack>
        <H2 color="black">{name}</H2>
      </YStack>
    </YStack>
  );
}

// prettier-ignore
interface WorkoutProps extends NativeStackScreenProps<RootWorkoutStackParamList, "WorkoutScreen"> {}

type ModalContent = {
  title: string;
  description: string;
  onConfirm: (...args: any) => void;
};

function WorkoutScreen({ navigation }: WorkoutProps) {
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const workouts = useBoundStore((state) => state.workouts);
  const { fetchWorkouts, setActiveWorkout } = useBoundStore(
    ({ fetchWorkouts, setActiveWorkout }) => ({
      fetchWorkouts,
      setActiveWorkout,
    })
  );

  const [modalContent, setModalContent] = useState<ModalContent>({
    title: "",
    description: "",
    onConfirm: () => {},
  });
  const [showModal, setShowModal] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchWorkouts();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        w="100%"
        h="100%"
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        p="$4"
      >
        <Stack p={5}>
          <Stack w="100%" space="$4">
            <ScreenHeader>
              Workouts
            </ScreenHeader>
            {workouts.map((workout, i) => (
              <Stack
                key={`${i}-${workout.name}`}
                onPress={() => {
                  setModalContent({
                    title: workout.name,
                    description: `Begin ${workout.name} workout?`,
                    onConfirm: () => {
                      setActiveWorkout({
                        workout,
                        startTime: Date.now(),
                      });
                      setShowModal(false);
                      navigation.navigate('ActiveWorkoutModal');
                    },
                  });
                  setShowModal(true);
                }}
              >
                <WorkoutCard name={workout.name} />
              </Stack>
            ))}
          </Stack>
        </Stack>
      </ScrollView>
      <FAB
        color="$indigo700"
        iconColor="white"
        onPress={() => navigation.navigate("AddWorkoutModal")}
      />
      <ConfirmationDialog
        isOpen={showModal}
        onConfirm={modalContent.onConfirm}
        onCancel={() => {
          setShowModal(false);
        }}
        title={modalContent.title}
        description={modalContent.description}
      />
    </SafeAreaView>
  );
}

export default WorkoutScreen;

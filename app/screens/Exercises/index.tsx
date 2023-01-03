import { ExerciseModel } from "@App/data/entities/Exercise";
import { useDatabase } from "@App/hooks/useDatabase";
import { FontAwesome5 } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootExerciseStackParamList } from "@Root/Navigation";
import {
  Box,
  Fab,
  Heading,
  Icon,
  ScrollView,
  Stack,
  Text,
  View
} from "native-base";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl, StyleSheet } from "react-native";

function ExerciseCard({ name }: { name: string }) {
  return (
    <Box
      w="full"
      p="3"
      rounded="lg"
      _dark={{ backgroundColor: "gray.700", borderColor: "coolGray.600" }}
      shadow="2"
    >
      <Stack>
        <Heading size="md">{name}</Heading>
        <Text>Sample description blabla</Text>
      </Stack>
    </Box>
  );
}

// ─── Component & Props ─────────────────────────────────────────────────── ✣ ─
// prettier-ignore
interface ExerciseProps extends NativeStackScreenProps<RootExerciseStackParamList, "ExerciseScreen"> {}

export default function ExerciseScreen({ navigation }: ExerciseProps) {
  const { exerciseRepository } = useDatabase();
  const [exercises, setExercises] = useState<ExerciseModel[]>([]);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    // Refresh the exercise list whenever the screen comes back into focus
    const unsubscribe = navigation.addListener("focus", () => {
      exerciseRepository.getAll().then(setExercises);
    });

    return unsubscribe;
  }, [navigation]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const result = await exerciseRepository.getAll();
    setExercises(result);
    setRefreshing(false);
  }, []);

  return (
    <Box safeAreaTop>
      <ScrollView
        w="full"
        h="full"
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        <View p="4">
          <Stack w="full" space="4">
            <Heading size="4xl" style={styles.header}>
              Exercises
            </Heading>
            {exercises.map(({ name }, i) => (
              <ExerciseCard key={`${i}-${name}`} name={name} />
            ))}
          </Stack>
        </View>
      </ScrollView>
      <Fab
        onPress={() => navigation.navigate("AddExerciseModal")}
        renderInPortal={false}
        shadow={4}
        size="lg"
        w="75"
        h="75"
        icon={<Icon as={FontAwesome5} name="plus" size="xl" ml="1" />}
        backgroundColor="violet.700"
      />
    </Box>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────── ✣ ─

const styles = StyleSheet.create({
  header: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

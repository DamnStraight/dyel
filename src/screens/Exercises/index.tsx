import { ExerciseModel } from "@App/data/entities/Exercise";
import { useDatabase } from "@App/hooks/useDatabase";
import { RootExerciseStackParamList } from "@App/Navigation";
import { FontAwesome } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl, SafeAreaView, StyleSheet } from "react-native";
import { Button, Heading, ScrollView, Stack, Text, YStack, H1 } from "tamagui";
import FAB from "../../components/FAB";

function ExerciseCard({ name }: { name: string }) {
  return (
    <YStack padding={10} borderRadius={13} elevation={10} bg="white">
      <YStack>
        <Heading size="$5" color="black">
          {name}
        </Heading>
        <Text>Sample description blabla</Text>
      </YStack>
    </YStack>
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

    try {
      const result = await exerciseRepository.getAll();
      setExercises(result);
    } catch (e) {
      console.log(e);
    }

    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack flex={1}>
        <YStack flex={1} padding="$4">
          <ScrollView
            flex={1}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
          >
            <Stack p={4}>
              <YStack flex={1} space="$4">
                <H1 color="$slate50" size="$12" style={styles.header}>
                  Exercises
                </H1>
                {exercises.map(({ name }, i) => (
                  <ExerciseCard key={`${i}-${name}`} name={name} />
                ))}
              </YStack>
            </Stack>
          </ScrollView>
        </YStack>
        <FAB onPress={() => navigation.navigate("AddExerciseModal")} />
      </Stack>
    </SafeAreaView>
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

// shadowOffsetX = 0 , shadowOffsetY = 0, shadowRadius=13, shadowopacity=0.1

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
import { StyleSheet } from "react-native";

function ExerciseCard() {
  return (
    <Box
      w="full"
      p="3"
      rounded="lg"
      _dark={{ backgroundColor: "gray.700", borderColor: "coolGray.600" }}
      shadow="2"
    >
      <Stack>
        <Heading size="md">Bench Press</Heading>
        <Text>Sample description blabla</Text>
      </Stack>
    </Box>
  );
}

// ─── Component & Props ─────────────────────────────────────────────────── ✣ ─

interface ExerciseProps extends NativeStackScreenProps<RootExerciseStackParamList, "ExerciseScreen"> {}

export default function ExerciseScreen({ navigation }: ExerciseProps) {
  return (
    <Box safeAreaTop>
      <Box>
        <ScrollView w="full" h="full">
          <View p="4">
            <Stack w="full" space="4">
              <Heading size="4xl" style={styles.header}>
                Exercises
              </Heading>
              <ExerciseCard />
              <ExerciseCard />
              <ExerciseCard />
              <ExerciseCard />
              <ExerciseCard />
              <ExerciseCard />
              <ExerciseCard />
              <ExerciseCard />
              <ExerciseCard />
              <ExerciseCard />
              <ExerciseCard />
              <ExerciseCard />
              <ExerciseCard />
              <ExerciseCard />
              <ExerciseCard />
            </Stack>
          </View>
        </ScrollView>
      </Box>
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

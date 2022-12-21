import { FontAwesome5 } from "@expo/vector-icons";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "@Root/Navigation";
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

interface ExerciseProps extends BottomTabScreenProps<RootTabParamList, "Exercises"> {}

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

function ExerciseScreen({ navigation }: ExerciseProps) {
  return (
    <Box safeAreaTop>
      <Box>
        <ScrollView w="full" h="full">
          <View p="4">
            <Stack w="full" space="4">
              <Heading size="4xl">Exercises</Heading>
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
        shadow={2}
        size="lg"
        w="75"
        h="75"
        icon={<Icon as={FontAwesome5} name="plus" />}
        backgroundColor="violet.700"
      />
    </Box>
  );
}

export default ExerciseScreen;

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "@Root/Navigation";
import { Text, View } from "react-native";

interface AddExerciseModal extends BottomTabScreenProps<RootTabParamList, "AddExerciseModal"> {}

function AddExercise({ navigation }: AddExerciseModal) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>AddExerciseModal</Text>
    </View>
  );
}

export default AddExercise;

import {
  Box,
  Heading,
  ScrollView,
  VStack,
  Text,
  Pressable,
  HStack,
} from "native-base";
import { View, StyleSheet } from "react-native";

function DashboardScreen() {
  return (
    <Box safeAreaTop>
      <Box p="4">
        <ScrollView w="full" h="full">
          <VStack space={4}>
            <Box>
              <Heading size="2xl" style={styles.textShadowLarge}>
                Good Morning,
              </Heading>
              <Heading size="3xl" style={styles.textShadowLarge}>
                Steven
              </Heading>
            </Box>
            <Pressable>
              {({ isPressed }) => {
                return (
                  <Box
                    borderRadius="lg"
                    bg={isPressed ? "indigo.500" : "indigo.400"}
                    p="4"
                    minH="40"
                    shadow="lg"
                  >
                    <VStack space={2}>
                      <Heading style={styles.textShadowSmall}>
                        Your last workout
                      </Heading>
                      <Heading size="sm" style={styles.textShadowSmall}>
                        2022-12-29 - Chest Day
                      </Heading>
                      <Text style={styles.textShadowSmall}>Bla bla text might go here, like if you did something notable like hit a new PR lift</Text>
                    </VStack>
                  </Box>
                );
              }}
            </Pressable>
            <HStack space="4">
              <Box w="48%" h="40" bg="violet.200" rounded="lg" p="4" shadow="lg">
                <Heading color="gray.800">Settings</Heading>
              </Box>
              <Box w="48%" h="40" bg="violet.200" rounded="lg" p="4" shadow="lg">
                <Heading color="gray.800">Temp</Heading>
              </Box>
            </HStack>
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  );
}

export default DashboardScreen;

// ─── Styles ────────────────────────────────────────────────────────────── ✣ ─

const styles = StyleSheet.create({
  textShadowLarge: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  textShadowSmall: {
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 2,
  },
});

import { View, StyleSheet } from "react-native";
import { Stack, XStack, YStack, ScrollView, Heading } from "tamagui";

function DashboardScreen() {
  return (
    // <YStack fullscreen>
        <ScrollView maxHeight={500}>
          <YStack>
            <YStack w="100%" padding={20}>
              <Heading size={"$10"} style={styles.textShadowLarge} color="white">
                {/* TODO Make this based on the time of day (Good monring, good afternoon, good evening) */}
                Good Morning,
              </Heading>
              <Heading size="$10" style={styles.textShadowLarge} color="white">
                {/* Allow user to enter name in settings personalization */}
                Steven
              </Heading>
            </YStack>
            {/* <Pressable>
              {({ isPressed }) => {
                return (
                  <Box
                    borderRadius="lg"
                    bg={isPressed ? "indigo.500" : "indigo.400"}
                    p="4"
                    minH="40"
                    shadow="lg"
                  >
                    <YStack space={2}>
                      <Heading style={styles.textShadowSmall}>
                        Your last workout
                      </Heading>
                      <Heading size="sm" style={styles.textShadowSmall}>
                        2022-12-29 - Chest Day
                      </Heading>
                      <Text style={styles.textShadowSmall}>
                        Bla bla text might go here, like if you did something
                        notable like hit a new PR lift
                      </Text>
                    </YStack>
                  </Box>
                );
              }}
            </Pressable> */}
            <XStack>
              <Stack bg="white" flex={0.5} borderRadius={10} margin={15} padding={20} h={175}>
                <Heading>Settings</Heading>
              </Stack>
              <Stack bg="white" flex={0.5} borderRadius={10} margin={15} padding={20} h={175}>
                <Heading>Temp</Heading>
              </Stack>
            </XStack>
          </YStack>
        </ScrollView>
    // </YStack>
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

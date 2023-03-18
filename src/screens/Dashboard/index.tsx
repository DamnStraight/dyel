import {
  View,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  Pressable,
} from "react-native";
import {
  Stack,
  XStack,
  YStack,
  ScrollView,
  Heading,
  Text,
  Button,
} from "tamagui";

function DashboardScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <YStack height="100%" p="$4" space="$3">
          <YStack w="100%">
            <Heading size={"$10"} style={styles.textShadowLarge} color="white">
              {/* TODO Make this based on the time of day (Good morning, good afternoon, good evening) */}
              Good Morning,
            </Heading>
            <Heading size="$10" style={styles.textShadowLarge} color="white">
              {/* TODO Allow user to enter name in settings personalization */}
              Steven
            </Heading>
          </YStack>
          <Stack
            borderRadius={15}
            bg="$zinc100"
            p={20}
            minHeight={175}
            animation="bouncy"
            pressStyle={{ scale: 0.96, bg: "$zinc200" }}
          >
            <YStack space={2}>
              <Heading style={styles.textShadowSmall}>
                Your last workout
              </Heading>
              <Heading size="$5" style={styles.textShadowSmall}>
                2022-12-29 - Chest Day
              </Heading>
              <Text style={styles.textShadowSmall}>
                Bla bla text might go here, like if you did something notable
                like hit a new PR lift
              </Text>
            </YStack>
          </Stack>
          <XStack space="$3">
            <Stack
              bg="$zinc100"
              flex={0.5}
              borderRadius={15}
              padding={20}
              h={175}
              animation="bouncy"
              pressStyle={{ scale: 0.96, bg: "$zinc200" }}
            >
              <Heading>Settings</Heading>
            </Stack>
            <Stack
              bg="$zinc100"
              flex={0.5}
              borderRadius={15}
              padding={20}
              h={175}
              animation="bouncy"
              pressStyle={{ scale: 0.96, bg: "$zinc200" }}
            >
              <Heading>Temp</Heading>
            </Stack>
          </XStack>
        </YStack>
      </ScrollView>
      <Stack
        position="absolute"
        bottom={0}
        right={0}
        mb={25}
        mr={25}
        flex={1}
        alignItems="flex-end"
      >
        <Button
          flex={0.4}
          bg="$indigo600"
          h={75}
          color="white"
          pressStyle={{ bg: "$indigo900" }}
          borderRadius={40}
        >
          Start a workout
        </Button>
      </Stack>
    </SafeAreaView>
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

import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { H1 } from "tamagui";
import useTimer from "../../../../hooks/useTimer";
import { useBoundStore } from "../../../../store";

const formatTime = (timer: number) => {
  const seconds = `0${(timer % 60)}`.slice(-2)
  const minutes = `0${Math.floor(timer / 60) % 60}`.slice(-2)
  const hours = `0${Math.floor(timer / 3600)}`.slice(-2)

  return `${hours} : ${minutes} : ${seconds}`
}

function createInitialTimer() {
  const activeWorkout = useBoundStore.getState().activeWorkout;

  const startTime = dayjs(activeWorkout?.startTime);
  const now = dayjs();

  const seconds = now.diff(startTime, "seconds");

  return seconds
}

const Timer = () => {
  const timerStarted = useRef(false);

  const { timer, handleStart } = useTimer(createInitialTimer);

  useEffect(() => {
    if (timerStarted.current === false) {
      handleStart();
      timerStarted.current = true;
    }
  }, [])

  return (
    <H1 color="$slate50" size="$12" style={styles.header}>
    {formatTime(timer)}
  </H1>
  )
}

const styles = StyleSheet.create({
  header: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default Timer;
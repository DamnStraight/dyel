import { useRef, useState } from "react";

const useTimer = (initialTime: number | (() => number) = 0) => {
  const [timer, setTimer] = useState<number>(initialTime);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const countRef = useRef<NodeJS.Timer | null>(null);

  const handleStart = () => {
    countRef.current = setInterval(() => {
      setTimer((prevTime) => prevTime + 1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(countRef.current!);
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTimer((prevTime) => prevTime + 1);
    }, 1000);
  };

  return { timer, isPaused, handleStart, handlePause, handleResume };
};

export default useTimer;

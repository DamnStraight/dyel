import AppDataSource from "@App/data/AppDataSource";
import { ExerciseRepository } from "@App/data/repositories/ExerciseRepository";
import { WorkoutRepository } from "@App/data/repositories/WorkoutRepository";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Heading, Spinner, Stack } from "tamagui";
import { ExerciseSetRepository } from "../data/repositories/ExerciseSetRepository";

interface DatabaseConnectionContextRepos {
  exerciseRepository: ExerciseRepository;
  workoutRepository: WorkoutRepository;
  exerciseSetRepository: ExerciseSetRepository;
}

// prettier-ignore
export const DatabaseConnectionContext = createContext<DatabaseConnectionContextRepos> (
  {} as DatabaseConnectionContextRepos
);

// TODO Remove this when simulating loading is no longer necessary
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Make sure the typeorm datasource is fully loaded before providing the context
// prettier-ignore
export const DatabaseConnectionProvider: React.FC<{ children: ReactNode }> = ({ children, }) => {
  const [isInitialized, setInitialized] = useState<boolean>(false);

  const initializeDataSource = useCallback(async () => {
    try {
      await AppDataSource.initialize();
    } catch (e) {
      console.log(e)
    }
    
    // Test loading on app load
    // await delay(4000);
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) {
      initializeDataSource();
    }
  }, [initializeDataSource, isInitialized]);

  if (!isInitialized) {
    return (
      <Stack h="100%" w="100%" bg="gray">
          <Spinner size="large" color="red" />
          <Heading size="$10" color="violet">
            Loading
          </Heading>
      </Stack>
    );
  }

  return (
    <DatabaseConnectionContext.Provider
      value={{ 
        exerciseRepository: new ExerciseRepository(AppDataSource), 
        workoutRepository: new WorkoutRepository(AppDataSource),
        exerciseSetRepository: new ExerciseSetRepository(AppDataSource)
      }}
    >
      {children}
    </DatabaseConnectionContext.Provider>
  );
};

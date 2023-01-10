import AppDataSource from "@App/data/AppDataSource";
import { ExerciseRepository } from "@App/data/repositories/ExerciseRepository";
import { Box, Center, Heading, Spinner } from "native-base";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState
} from "react";

interface DatabaseConnectionContextRepos {
  exerciseRepository: ExerciseRepository;
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
    await AppDataSource.initialize();
    await delay(4000);
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) {
      initializeDataSource();
    }
  }, [initializeDataSource, isInitialized]);

  if (!isInitialized) {
    return (
      <Box h="full" w="full" bg="gray.800" safeAreaTop>
        <Center h="full">
          <Spinner size="lg" color="violet.500" />
          <Heading size="3xl" color="violet.500">
            Loading
          </Heading>
        </Center>
      </Box>
    );
  }

  return (
    <DatabaseConnectionContext.Provider
      value={{ exerciseRepository: new ExerciseRepository(AppDataSource) }}
    >
      {children}
    </DatabaseConnectionContext.Provider>
  );
};

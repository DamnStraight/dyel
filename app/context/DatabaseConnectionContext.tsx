import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ActivityIndicator } from "react-native";
import { DataSource } from "typeorm";
import { ExerciseModel } from "../data/entities/Exercise";
import { ExerciseRepository } from "../data/repositories/ExerciseRepository";

interface DatabaseConnectionContextRepos {
  exerciseRepository: ExerciseRepository;
}

export const DatabaseConnectionContext = createContext<DatabaseConnectionContextRepos>(
  {} as DatabaseConnectionContextRepos
);

export const DatabaseConnectionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [dataSource, setDataSource] = useState<DataSource | null>(null);

  const createDataSource = useCallback(async () => {
    const AppDataSource = new DataSource({
      type: "expo",
      database: "dyel.db",
      driver: require("expo-sqlite"),
      entities: [ExerciseModel],
      synchronize: true,
    });

    await AppDataSource.initialize();

    setDataSource(AppDataSource);
  }, []);

  useEffect(() => {
    if (!dataSource) {
      createDataSource();
    }
  }, [createDataSource, dataSource]);

  if (!dataSource) {
    return <ActivityIndicator />;
  }

  return (
    <DatabaseConnectionContext.Provider
      value={{ exerciseRepository: new ExerciseRepository(dataSource) }}
    >
      {children}
    </DatabaseConnectionContext.Provider>
  );
};

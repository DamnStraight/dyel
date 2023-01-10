import { DataSource } from "typeorm";
import { ExerciseModel } from "./entities/Exercise";

const AppDataSource = new DataSource({
  type: "expo",
  database: "dyel.db",
  driver: require("expo-sqlite"),
  entities: [ExerciseModel],
  synchronize: true,
  dropSchema: true
});

export default AppDataSource;
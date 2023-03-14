import { DataSource } from "typeorm";
import { ExerciseModel } from "./entities/Exercise";
import { ExerciseSetModel } from "./entities/ExerciseSet";
import { WorkoutModel } from "./entities/Workout";

const AppDataSource = new DataSource({
  type: "expo",
  database: "dyel.db",
  driver: require("expo-sqlite"),
  entities: [ExerciseModel, WorkoutModel, ExerciseSetModel],
  synchronize: true,
  dropSchema: true,
  logging: true
});

export default AppDataSource;
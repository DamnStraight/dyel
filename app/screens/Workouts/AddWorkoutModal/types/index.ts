import { ExerciseSetModel, SetType } from "@App/data/entities/ExerciseSet";
import { ExerciseModel } from "@App/data/entities/Exercise";

export const DEFAULT_SET: Set = { weight: "", reps: "", type: SetType.REGULAR };

export interface Set extends Pick<ExerciseSetModel, 'type'> {
  // Type these as string for Form input handling
  weight: string;
  reps: string;
}

export interface AddWorkoutFormValues {
  workoutName: string;
  exercises: ExerciseSetDto[];
}

export interface ExerciseSetDto
  extends Omit<ExerciseModel, "workouts" | "exerciseSets"> {
  exerciseSets: Set[];
}
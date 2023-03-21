import { StateCreator } from "zustand";
import { ExerciseModel } from "@App/data/entities/Exercise";
import AppDataSource from "@App/data/AppDataSource";

export type ExerciseSlice = {
  exercises: ExerciseModel[];
  setExercises: (exercises: ExerciseModel[]) => void;
  addExercises: (exercise: ExerciseModel) => void;
  fetchExercises: () => Promise<void>;
};

export const createExerciseSlice: StateCreator<
  ExerciseSlice,
  [],
  [],
  ExerciseSlice
> = (set) => ({
  exercises: [],
  setExercises: (exercises) =>
    set((state) => ({
      ...state,
      exercises,
    })),
  addExercises: (exercise) =>
    set((state) => ({
      ...state,
      workouts: [...state.exercises, exercise],
    })),
  fetchExercises: async () => {
    const exerciseRepository = AppDataSource.getRepository(ExerciseModel);
    const exercises = await exerciseRepository.find();

    set((state) => ({
      ...state,
      exercises,
    }));
  },
});

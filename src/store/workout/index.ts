import { StateCreator } from "zustand";
import AppDataSource from "@App/data/AppDataSource";
import { WorkoutModel } from "@App/data/entities/Workout";

export type ActiveWorkout = {
  workout: WorkoutModel,
  startTime: number
}

export type WorkoutSlice = {
  activeWorkout?: ActiveWorkout;
  workouts: WorkoutModel[];
  setActiveWorkout: (workout: ActiveWorkout) => void;
  setWorkouts: (workouts: WorkoutModel[]) => void;
  addWorkout: (workout: WorkoutModel) => void;
  fetchWorkouts: () => Promise<void>;
};

export const createWorkoutSlice: StateCreator<
  WorkoutSlice,
  [],
  [],
  WorkoutSlice
> = (set) => ({
  activeWorkout: undefined,
  workouts: [],
  setActiveWorkout: (activeWorkout: ActiveWorkout) =>
    set((state) => ({
      ...state,
      activeWorkout,
    })),
  setWorkouts: (workouts: WorkoutModel[]) =>
    set((state) => ({
      ...state,
      workouts,
    })),
  addWorkout: (workout: WorkoutModel) =>
    set((state) => ({
      ...state,
      workouts: [...state.workouts, workout],
    })),
  fetchWorkouts: async () => {
    const workoutRepository = AppDataSource.getRepository(WorkoutModel);
    const workouts = await workoutRepository.find();

    set((state) => ({
      ...state,
      workouts,
    }));
  },
});

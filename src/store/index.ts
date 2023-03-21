import { create } from "zustand";
import { createExerciseSlice, ExerciseSlice } from "./exercise";
import { createWorkoutSlice, WorkoutSlice } from "./workout";

export const useBoundStore = create<WorkoutSlice & ExerciseSlice>()((...a) => ({
  ...createWorkoutSlice(...a),
  ...createExerciseSlice(...a),
}));

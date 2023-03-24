import {
  Column,
  Entity,
  ManyToMany, OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { ExerciseSetModel } from "./ExerciseSet";
import { WorkoutModel } from "./Workout";

export enum WeightMetric {
  KG = "kg",
  LBS = "lbs",
}

@Entity("exercises")
export class ExerciseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany("ExerciseSetModel", "exercise", { eager: true })
  exerciseSets: ExerciseSetModel[];
  // @OneToMany("ExerciseSetModel", "exercise", { lazy: true })
  // exerciseSets: Promise<ExerciseSetModel[]>;

  @ManyToMany("WorkoutModel", "exercises", { lazy: true, cascade: true })
  workouts: Promise<WorkoutModel[]>;

  // @Column({ default: 0 })
  // personalRecord: number;

  // @Column({ type: "simple-enum", default: WeightMetric.LBS, enum: WeightMetric })
  // metric: WeightMetric = WeightMetric.LBS;
}

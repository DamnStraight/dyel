import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ExerciseModel } from "./Exercise";
import { ExerciseSetModel } from "./ExerciseSet";

@Entity("workout")
export class WorkoutModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany("ExerciseModel", "workouts", { eager: true })
  @JoinTable()
  exercises: ExerciseModel[];

  @OneToMany("ExerciseSetModel", "workout", { eager: true })
  sets: ExerciseSetModel[];
}

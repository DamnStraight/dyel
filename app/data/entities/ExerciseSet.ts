import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExerciseModel } from "./Exercise";
import { WorkoutModel } from "./Workout";

export enum SetType {
  REGULAR = 'REGULAR',
  WARMUP = 'WARMUP',
  DROP = 'DROP'
}

@Entity('exercise_set')
export class ExerciseSetModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  position: number;

  @Column({ type: "simple-enum", enum: SetType, default: SetType.REGULAR })
  type: SetType;

  @Column()
  weight: number;

  @Column({ default: 0 })
  reps: number;

  @ManyToOne('ExerciseModel', 'set', { cascade: true })
  exercise: ExerciseModel;

  @ManyToOne('WorkoutModel', 'sets', { cascade: true })
  workout: WorkoutModel
}
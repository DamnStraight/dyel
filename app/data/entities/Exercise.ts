import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('exercises')
export class ExerciseModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}
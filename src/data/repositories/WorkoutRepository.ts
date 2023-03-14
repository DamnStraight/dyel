import { DataSource, Repository } from "typeorm";
import { ExerciseModel } from "@App/data/entities/Exercise";
import { WorkoutModel } from "@App/data/entities/Workout";

export class WorkoutRepository {
  private ormRepository: Repository<WorkoutModel>;

  constructor(dataSource: DataSource) {
    this.ormRepository = dataSource.getRepository(WorkoutModel);
  }

  // public async create(name: string, exercises: Partial<ExerciseModel>[], sets: Partial<ExerciseSetModel>[]): Promise<WorkoutModel> {
  public async create(name: string, exercises: Partial<ExerciseModel>[]): Promise<WorkoutModel> {
    const workout = this.ormRepository.create({ name, exercises })

    return workout;
  }

  public async getAll(): Promise<WorkoutModel[]> {
    const workouts = await this.ormRepository.find();

    return workouts;
  }

  public async save(workout: Partial<WorkoutModel>) {
    const workoutEntity = await this.ormRepository.save(workout)

    return workoutEntity;
  }
}

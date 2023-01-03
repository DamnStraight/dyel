import { DataSource, Repository } from "typeorm";
import { ExerciseModel } from "../entities/Exercise";

export class ExerciseRepository {
  private ormRepository: Repository<ExerciseModel>;

  constructor(dataSource: DataSource) {
    this.ormRepository = dataSource.getRepository(ExerciseModel);
  }

  public async create(name: string): Promise<ExerciseModel> {
    const exercise = this.ormRepository.create({ name });

    await this.ormRepository.save(exercise);

    return exercise;
  }

  public async getAll(): Promise<ExerciseModel[]> {
    const exercises = await this.ormRepository.find();

    return exercises;
  }
}
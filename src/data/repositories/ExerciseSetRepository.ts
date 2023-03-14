import { DataSource, Repository } from "typeorm";
import { ExerciseSetModel } from "@App/data/entities/ExerciseSet";

export class ExerciseSetRepository {
  private ormRepository: Repository<ExerciseSetModel>;

  constructor(dataSource: DataSource) {
    this.ormRepository = dataSource.getRepository(ExerciseSetModel);
  }

  public async create(
    sets: Array<Omit<ExerciseSetModel, "id" | "position">>
  ): Promise<ExerciseSetModel[]> {
    let exercises = await this.ormRepository.save(sets);

    return exercises;
  }

  public async getAll(): Promise<ExerciseSetModel[]> {
    const exercises = await this.ormRepository.find();

    return exercises;
  }
}

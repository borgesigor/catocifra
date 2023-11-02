import CifraRepository from "../../aplication/repository/CifraRepository";
import DatabaseAdapter from "../external/DatabaseAdapter";
import UUIDGeneratorAdapter, { IUUIDGenerator } from "../../infraestructure/external/UUIDGenerator";
import { CifraCreatorDTO } from "../../aplication/dtos/CifraDTO";

export default class CifraService{
  private uuid: IUUIDGenerator = new UUIDGeneratorAdapter;
  private databaseAdapter: DatabaseAdapter = new DatabaseAdapter();
  private cifraRepository: CifraRepository = new CifraRepository(this.databaseAdapter);

  async create(cifra: CifraCreatorDTO){
    this.cifraRepository.create({
      id: this.uuid.generate(),
      title: cifra.title,
      artist: cifra.artist,
      content: cifra.content,
      createdAt: new Date().toISOString()
    });
  }
}
import CifraRepository from "../../aplication/repository/CifraRepository";
import IUUIDGenerator from "../../aplication/adapters/IUUIDGenerator";
import IDatabasebaseContext from "../../aplication/adapters/IDatabaseContext"
import { CifraCreatorDTO, CifraUpdaterDTO } from "../dtos/CifraDTO";

export default class CifraService{
  constructor(
    private uuid: IUUIDGenerator,
    private database: IDatabasebaseContext
  ){}

  private cifraRepository: CifraRepository = new CifraRepository(this.database);

  async create(cifra: CifraCreatorDTO){
    this.cifraRepository.create({
      id: this.uuid.generate(),
      title: cifra.title,
      artist: cifra.artist,
      content: cifra.content,
      createdAt: new Date().toISOString()
    });
  }

  async update(cifra: CifraUpdaterDTO){
    this.cifraRepository.update({
      id: cifra.id,
      title: cifra.title,
      artist: cifra.artist,
      content: cifra.content,
      createdAt: new Date().toISOString()
    })
  }

  async delete(id: String){
    // checagens
    this.cifraRepository.delete(id);
  }



}
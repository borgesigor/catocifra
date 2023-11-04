import CifraRepository from "../../aplication/repository/CifraRepository";
import IUUIDContext from "../../aplication/context/IUUIDContext";
import IDatabasebaseContext from "../../aplication/context/IDatabaseContext"
import { CifraCreatorDTO, CifraUpdaterDTO } from "../../aplication/dtos/CifraDTO";

export default class CifraService{
  constructor(
    private uuid: IUUIDContext,
    private database: IDatabasebaseContext
  ){}

  private cifra: CifraRepository = new CifraRepository(this.database);

  async create(cifra: CifraCreatorDTO){
    const result = this.cifra.create({
      id: this.uuid.generate(),
      title: cifra.title,
      artist: cifra.artist,
      content: cifra.content,
      createdAt: new Date().toISOString()
    })
    console.log(result)
    return true
  }

  async update(cifra: CifraUpdaterDTO){
    this.cifra.update({
      id: cifra.id,
      title: cifra.title,
      artist: cifra.artist,
      content: cifra.content
    })
  }

  async delete(id: String){
    // checagens
    this.cifra.delete(id);
  }

}
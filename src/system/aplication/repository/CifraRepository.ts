import Cifra from "../../core/entity/Cifra";
import CifraUseCases from "../../core/usecases/CifraUseCases";
import IDatabaseContext, { FindMany, FindUnique } from '../../aplication/adapters/IDatabaseContext'

const TableName = "Cifra"

class CifraRepository implements CifraUseCases{
  constructor(
    private database: IDatabaseContext
  ){}

  async create(cifra: Cifra): Promise<void>{
    await this.database.create(TableName, {
      data: {
        id: cifra.id,
        title: cifra.title,
        artist: cifra.artist,
        content: cifra.content,
        createdAt: cifra.createdAt
      }
    })
  }

  async findAll(args: FindMany): Promise<Cifra[]>{ 
    return await this.database.findMany(TableName, args) as Cifra[];
  }

  async findById(id: String): Promise<Cifra>{
    return await this.database.findUnique(TableName, { where: { id } }) as Cifra;
  }

  async update(cifra: Cifra): Promise<void>{
    await this.database.update(TableName, {
      where: {
        id: cifra.id
      },
      data: {
        title: cifra.title,
        artist: cifra.artist,
        content: cifra.content
      }
    })
  }

  async delete(id: String): Promise<void>{
    await this.database.delete(TableName, {
      where: {
        id
      },
    })
  }

}

export default CifraRepository
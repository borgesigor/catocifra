import Cifra from "../../core/entity/Cifra";
import CifraUseCases from "../../core/usecases/CifraUseCases";
import IDatabaseContext, { Create, Delete, FindMany, FindUnique, Update } from '../../aplication/adapters/IDatabaseContext'

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

  async findUnique(id: String): Promise<Object>{
    return await this.database.findUnique(TableName, {
      where: {
        id: id
      }
    })
  }

  async findMany(page: number, maxResults?: number): Promise<Object[]>{
    return await this.database.findMany(TableName, {
      take: maxResults || 20,
      skip: page
    }) as Object[]
  }

  async update(cifra: Cifra): Promise<void>{
    await this.database.update(TableName, {
      where: {
        id: cifra.id
      },
      data: {
        id: cifra.id,
        title: cifra.title,
        artist: cifra.artist,
        content: cifra.content,
        createdAt: cifra.createdAt
      }
    })
  }

  async delete(id: String): Promise<void>{
    
  }

}

export default CifraRepository
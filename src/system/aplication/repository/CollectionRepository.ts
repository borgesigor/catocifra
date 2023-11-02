import Collection from "../../core/entity/Collection";
import CollectionUseCases from "../../core/usecases/CollectionUseCases"
import IDatabase, { FindMany } from "../context/IDatabaseContext";

const TableName = "Collection"

class CollectionRepository implements CollectionUseCases{
  constructor(
    private database: IDatabase
  ){}

  async create(collection: Collection): Promise<void>{
    await this.database.create(TableName, {
      data: {
        id: collection.id,
        name: collection.name,
        authorId: collection.authorId,
        createdAt: collection.createdAt
      }
    })
  }

  async findAll(args: FindMany): Promise<Collection[]>{ 
    return await this.database.findMany(TableName, args) as Collection[];
  }

  async findById(id: String): Promise<Collection>{
    return await this.database.findUnique("Cifra", { where: { id } }) as Collection;
  }

  async update(collection: Collection): Promise<void>{
    await this.database.update(TableName, {
      where: {
        id: collection.id
      },
      data: {
        name: collection.name,
        authorId: collection.authorId
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

export default CollectionRepository
import IUUIDContext from "../../aplication/context/IUUIDContext";
import IDatabaseContext from "../../aplication/context/IDatabaseContext"
import CollectionRepository from "../../aplication/repository/CollectionRepository";
import { CollectionCreatorDTO, CollectionUpdaterDTO } from "../../aplication/dtos/CollectionDTO";

export default class CollectionService{
  constructor(
    private uuid: IUUIDContext,
    private database: IDatabaseContext
  ){}

  private repository: CollectionRepository = new CollectionRepository(this.database);

  async create(collection: CollectionCreatorDTO){
    this.repository.create({
      id: this.uuid.generate(),
      name: collection.name,
      authorId: collection.authorId,
      createdAt: new Date().toISOString()
    });
  }

  async update(collection: CollectionUpdaterDTO){
    this.repository.update({
      id: this.uuid.generate(),
      name: collection.name,
      authorId: collection.authorId
    })
  }

  async delete(id: String){
    // checagens
    this.repository.delete(id);
  }
}
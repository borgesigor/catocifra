import CollectionRepository from "../../aplication/repository/CollectionRepository";
import IUUIDContext from "../../aplication/context/IUUIDContext";
import IDatabaseContext from "../../aplication/context/IDatabaseContext"
import { CollectionCreatorDTO, CollectionUpdaterDTO } from "../../aplication/dtos/CollectionDTO";

export default class CollectionService{
  constructor(
    private uuid: IUUIDContext,
    private database: IDatabaseContext
  ){}

  private collection: CollectionRepository = new CollectionRepository(this.database);

  async create(collection: CollectionCreatorDTO){
    this.collection.create({
      id: this.uuid.generate(),
      name: collection.name,
      authorId: collection.authorId,
      createdAt: new Date().toISOString()
    });
  }

  async update(collection: CollectionUpdaterDTO){
    this.collection.update({
      id: this.uuid.generate(),
      name: collection.name,
      authorId: collection.authorId
    })
  }

  async delete(id: String){
    // checagens
    this.collection.delete(id);
  }
}
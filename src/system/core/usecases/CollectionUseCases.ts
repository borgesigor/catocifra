import Collection from "../entity/Collection";

interface CollectionUseCases{
  create: (collection: Collection) => Promise<void>;
  findAll: (args: Object) => Promise<Collection[]>;
  findById: (id: String) => Promise<Collection>;
  update: (collection: Collection) => Promise<void>;
  delete: (id: String) => Promise<void>;
}

export default CollectionUseCases;
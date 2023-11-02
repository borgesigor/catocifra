import User from "./User";
import Cifra from "./Cifra";

interface Collection{
  id: String;
  name: String
  authorId: String;
  createdAt: Date;
}

export interface CollectionCifras{
  collectionId: String;
  cifraId: String;
}

export default Collection;
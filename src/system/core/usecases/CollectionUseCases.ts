import Collection from "../entity/Collection";
import FindArguments from "../utility/FindArguments"

interface CifraUseCases{
  create: (collection: Collection) => Promise<void>;
  read: (id: String) => Promise<Object>;
  update: (collection: Collection) => Promise<void>;
  delete: (id: String) => Promise<void>;
  findByUsername: (args: FindArguments) => Promise<Object[]>;
  findById: (args: FindArguments) => Promise<Object>;
}

export default CifraUseCases;
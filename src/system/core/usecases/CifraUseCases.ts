import Cifra from '../entity/Cifra';
import FindArguments from '../utility/FindArguments'

interface CifraUseCases{
  create: (cifra: Cifra) => Promise<void>;
  findUnique: (id: String) => Promise<Object>;
  findMany: (page: number, maxResults?: number) => Promise<Object[]>;
  update: (cifra: Cifra) => Promise<void>;
  delete: (id: String) => Promise<void>;
}

export default CifraUseCases;
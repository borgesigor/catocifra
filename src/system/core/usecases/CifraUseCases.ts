import Cifra from '../entity/Cifra';

interface CifraUseCases{
  create: (cifra: Cifra) => Promise<void>;
  findAll: (args: Object) => Promise<Cifra[]>;
  findById: (id: String) => Promise<Cifra>;
  update: (cifra: Cifra) => Promise<void>;
  delete: (id: String) => Promise<void>;
}

export default CifraUseCases;
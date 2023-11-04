import User from "../entity/User";

interface UserUseCases{
  create: (user: User) => Promise<void>;
  findMany: (args: Object) => Promise<User[]>;
  findUnique: (args: Object) => Promise<User>;
  update: (user: User) => Promise<void>;
  delete: (id: String) => Promise<void>;
}

export default UserUseCases;
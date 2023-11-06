import User from "../entity/User";

interface FindUnique{
  where: Object
}

interface UserUseCases{
  create: (user: User) => Promise<Boolean>;
  findMany: (args: Object) => Promise<User[]>;
  findUnique: (args: FindUnique) => Promise<User>;
  update: (user: User) => Promise<Boolean>;
  delete: (id: String) => Promise<Boolean>;
}

export default UserUseCases;
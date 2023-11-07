import User from "../entity/User";

interface FindUnique{
  where: Object
}

interface UserUseCases{
  create: (user: User) => Promise<Object>;
  findMany: (args: Object) => Promise<User[]>;
  findUnique: (args: FindUnique) => Promise<User>;
  update: (user: User) => Promise<Object>;
  delete: (id: String) => Promise<Object>;
}

export default UserUseCases;
import User from "../entity/User";

interface UserUseCases{
  create: (user: User) => Promise<void>;
  findAll: (args: Object) => Promise<User[]>;
  findById: (id: String) => Promise<User>;
  update: (user: User) => Promise<void>;
  delete: (id: String) => Promise<void>;
}

export default UserUseCases;
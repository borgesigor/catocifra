import User from "../entity/User";

interface UserUseCases{
  create: (user: User) => Promise<void>;
  read: (id: String) => Promise<User>;
  update: (user: User) => Promise<void>;
  delete: (id: String) => Promise<void>;
  findAll: () => Promise<User[]>;
  findByUsername: (username: String) => Promise<User>;
  findById: (id: String) => Promise<User>;
}

export default UserUseCases;
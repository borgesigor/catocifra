import User from '../../core/entity/User'
import UserUseCases from '../../core/usecases/UserUseCases';
import IDatabase from '../adapters/IDatabaseContext'

class UserRepository implements UserUseCases{
  constructor(private database: IDatabase){}

  async create(user: User): Promise<void>{
    const query = `
      INSERT INTO "User"(id, username, password, createdAt)
      VALUES('${user.id}', '${user.username}', '${user.password}', '${user.createdAt}')
    `
    await this.database.rawQuery(query)
  }

  async read(id: String): Promise<User>{
    const query = `
      SELECT * FROM "User"
      WHERE id=${id}
    `
    const result = await this.database.rawQuery(query);
    return result as User
  }

  async update(user: User): Promise<void>{
    const query = `
      UPDATE "User"
      SET username=${user.username}, password=${user.password}, createdAt=${user.createdAt}
    `
    const result = await this.database.rawQuery(query);
  }

  async delete(id: String): Promise<void>{
    const query = `
      DELETE FROM "User"
      WHERE id=${id}
    `
    await this.database.rawQuery(query);
  }

  async findAll(): Promise<User[]>{
    const query = `
      SELECT * FROM "User"
    `
    const result = await this.database.rawQuery(query);
    return result as User[]
  } 

  async findByUsername(username: String): Promise<User>{
    const query = `
      SELECT * FROM "User"
      WHERE username=${username}
    `
    const result = await this.database.rawQuery(query);
    return result as User
  }

  async findById(id: String): Promise<User>{
    const query = `
      SELECT * FROM "User"
      WHERE id=${id}
    `
    const result = await this.database.rawQuery(query);
    return result as User
  }

}

export default UserRepository
import User from '../../core/entity/User'
import UserUseCases from '../../core/usecases/UserUseCases';
import { UserUpdaterDTO } from '../dtos/UserDTO';
import IDatabaseContext, { FindMany, FindUnique } from '../context/IDatabaseContext'

const TableName = "User"

class UserRepository implements UserUseCases{
  constructor(
    private database: IDatabaseContext
  ){}

  async create(user: User): Promise<void>{
    await this.database.create(TableName, {
      data: {
        id: user.id,
        img: user.img,
        username: user.username,
        password: user.password,
        createdAt: user.createdAt
      }
    })
  }

  async findMany(args: FindMany): Promise<User[]>{ 
    return await this.database.findMany(TableName, args) as User[];
  }

  async findUnique(args: FindMany): Promise<User>{ 
    return await this.database.findMany(TableName, args) as User;
  }

  async update(user: UserUpdaterDTO): Promise<void>{
    await this.database.update(TableName, {
      where: {
        id: user.id
      },
      data: {
        img: user.img,
        username: user.username,
        password: user.password
      }
    })
  }

  async delete(id: String): Promise<void>{
    await this.database.delete(TableName, {
      where: {
        id
      },
    })
  }
}

export default UserRepository
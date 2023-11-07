import User from '../../core/entity/User'
import UserUseCases from '../../core/usecases/UserUseCases';
import IDatabaseContext, { FindMany, FindUnique } from '../../shared/context/IDatabaseContext'
import { UnexpectedError } from '../../shared/errorHandlers/Errors';

const TableName = "User"

class UserRepository implements UserUseCases{
  constructor(
    private database: IDatabaseContext
  ){}

  async create(user: User): Promise<Object>{
    return await this.database.create(TableName, {
      data: {
        id: user.id,
        img: user.img,
        username: user.username,
        password: user.password,
        createdAt: user.createdAt
      }
    })
    .catch((err)=>{
      throw new UnexpectedError(err)
    })
  }

  async findMany(args: FindMany): Promise<User[]>{ 
    return await this.database.findMany(TableName, args).catch((err)=>{
      throw new UnexpectedError(err)
    }) as User[];
  }

  async findUnique(args: FindUnique): Promise<User>{ 
    return await this.database.findUnique(TableName, args).catch((err)=>{
      throw new UnexpectedError(err)
    }) as User;
  }

  async update(user: User): Promise<Object>{
    return await this.database.update(TableName, {
      where: {
        id: user.id
      },
      data: {
        img: user.img,
        username: user.username,
        password: user.password
      }
    })
    .catch((err)=>{
      throw new UnexpectedError(err)
    })
  }

  async delete(id: String): Promise<Object>{
    return await this.database.delete(TableName, {
      where: {
        id
      },
    })
    .catch((err)=>{
      throw new UnexpectedError(err)
    })
  }
}

export default UserRepository
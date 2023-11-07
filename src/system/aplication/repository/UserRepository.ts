import User from '../../core/entity/User'
import UserUseCases from '../../core/usecases/UserUseCases';
import IDatabaseContext, { FindMany, FindUnique } from '../context/IDatabaseContext'
import { UserUpdaterDTO, UserPresenterDTO } from '../dtos/UserDTO';
import { UnexpectedError } from '../../infraestructure/errorHandlers/Errors';

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
    const result = await this.database.findMany(TableName, args).catch((err)=>{
      throw new UnexpectedError(err)
    })
    return result as User[];
  }

  async findUnique(args: FindUnique): Promise<User>{ 
    const result = await this.database.findUnique(TableName, args).catch((err)=>{
      throw new UnexpectedError(err)
    })

    return result as User;
  }

  async update(user: UserUpdaterDTO): Promise<Object>{
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
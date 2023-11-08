import User from '../../core/entity/User'
import UserUseCases from '../../core/usecases/UserUseCases';
import IDatabaseContext, { FindMany, FindUnique } from '../../shared/context/IDatabaseContext'
import { UserUpdaterDTO } from '../../shared/dtos/UserDTO';
import { UnexpectedError } from '../../shared/errorHandlers/Errors';

const TableName = "User"

interface UpdaterDTO{
  id: String,
  username?: String,
  password?: String,
  img?: String,
  isAdmin?: Boolean
}

class UserRepository implements UserUseCases{
  constructor(
    private database: IDatabaseContext
  ){}

  async create(user: User): Promise<Object>{
    return await this.database.create(TableName, {
      data: user
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

  async update(user: UpdaterDTO): Promise<Object>{
    const findById = await this.findUnique({
      where: {
        id: user.id
      }
    })

    return await this.database.update(TableName, {
      where: {
        id: user.id
      },
      data: {
        img: user.img || findById.img,
        username: user.username || findById.username,
        password: user.password || findById.password,
        isAdmin: user.isAdmin || findById.isAdmin,
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
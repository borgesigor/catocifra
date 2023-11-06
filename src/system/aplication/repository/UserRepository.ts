import User from '../../core/entity/User'
import UserUseCases from '../../core/usecases/UserUseCases';
import IDatabaseContext, { FindMany, FindUnique } from '../context/IDatabaseContext'
import { UserUpdaterDTO } from '../dtos/UserDTO';

const TableName = "User"

class UserRepository implements UserUseCases{
  constructor(
    private database: IDatabaseContext
  ){}

  async create(user: User): Promise<Boolean>{
    try{
      await this.database.create(TableName, {
        data: {
          id: user.id,
          img: user.img,
          username: user.username,
          password: user.password,
          createdAt: user.createdAt
        }
      })
      return true
    }catch(err){
      console.log(err)
      return false
    }
  }

  async findMany(args: FindMany): Promise<User[]>{ 
    return await this.database.findMany(TableName, args) as User[];
  }

  async findUnique(args: FindUnique): Promise<User>{ 
    return await this.database.findUnique(TableName, args) as User;
  }

  async update(user: UserUpdaterDTO): Promise<Boolean>{
    try{
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
      return true
    }catch(err){
      console.log(err)
      return false
    }
  }

  async delete(id: String): Promise<Boolean>{
    try {
      await this.database.delete(TableName, {
        where: {
          id
        },
      })
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
}

export default UserRepository
import DatabaseAdapter from "../adapters/DatabaseAdapter";
import UUIDGeneratorAdapter from "../adapters/UUIDGenerator";
import TokenAdapter from "../adapters/TokenAdapter";
import UserRepository from "../../aplication/repository/UserRepository";
import PasswordHashAdapter from "../adapters/PasswordHashAdapter";

import { 
  UserCreatorDTO, 
  UserUpdaterDTO, 
  UserDeleteDTO, 
  UserLoginDTO 
} from "../../aplication/dtos/UserDTO";

import { 
  UserUsernameAlreadyExists, 
  UserWithThisUsernameNotExists, 
  UserPasswordDontMatch,
  UserDoesntExist
} from "../errorHandlers/Errors";

export default class UserService{
  private database: DatabaseAdapter = new DatabaseAdapter();
  private uuid: UUIDGeneratorAdapter = new UUIDGeneratorAdapter();
  private token: TokenAdapter = new TokenAdapter();
  private passwordHash: PasswordHashAdapter = new PasswordHashAdapter();
  private user: UserRepository = new UserRepository(this.database);

  async register(user: UserCreatorDTO){
    if(await this.getUserByUsername(user.username)){
      throw new UserUsernameAlreadyExists()
    }

    const hashPassword = await this.passwordHash.hash(user.password)

    const result = await this.user.create({
      id: this.uuid.generate(),
      img: user.img,
      username: user.username,
      password: new String(hashPassword),
      createdAt: new Date().toISOString()
    })

    return result
  }

  async login(user: UserLoginDTO){
    const userSearch = await this.getUserByUsername(user.username)

    if(!userSearch){
      throw new UserWithThisUsernameNotExists();
    }

    if(!(userSearch.password == user.password)){
      throw new UserPasswordDontMatch();
    }

    const token = this.token.sign({
      username: user.username
    })

    return token
  }

  async update(user: UserUpdaterDTO){
    if(await this.getUserById(user.id)){
      return new UserDoesntExist()
    }

    this.user.update({
      id: this.uuid.generate(),
      img: user.img,
      username: user.username,
      password: user.password
    })
  }

  async delete(user: UserDeleteDTO){
    if(await this.getUserById(user.id)){
      return new UserDoesntExist()
    }

    this.user.delete(user.id);
  }

  async getUserById(id: String){
    return await this.user.findUnique({
      where: {
        id: id
      }
    })
  }

  async getUserByUsername(username: String){
    return await this.user.findUnique({
      where: {
        username: username
      }
    })
  }
}
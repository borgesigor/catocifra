import DatabaseAdapter from "../adapters/DatabaseAdapter";
import UUIDGeneratorAdapter from "../adapters/UUIDGenerator";
import UserRepository from "../../aplication/repository/UserRepository";
import AuthService from "./AuthService";

import { 
  UserCreatorDTO, 
  UserUpdaterDTO, 
  UserDeleteDTO, 
  UserLoginDTO,
  PermissionVerificationDTO,
  UserPresenterDTO
} from "../../shared/dtos/UserDTO";

import { 
  UserUsernameAlreadyExists, 
  UserPasswordDontMatch,
  UserDoesntExist,
  UnexpectedError
} from "../../shared/errorHandlers/Errors";

export default class UserService{
  private database: DatabaseAdapter = new DatabaseAdapter();
  private uuid: UUIDGeneratorAdapter = new UUIDGeneratorAdapter();
  private user: UserRepository = new UserRepository(this.database);
  private auth: AuthService = new AuthService(this.database);

  // Privados

  private async getUserSecretInfoByUsername(username: String){
    const result = await this.user.findUnique({
      where: {
        username: username
      }
    })

    return result
  }

  private async getUserSecretInfoById(id: String){
    const result = await this.user.findUnique({
      where: {
        id: id
      }
    })

    return result
  }

  // Publicos

  public async register(user: UserCreatorDTO): Promise<UserPresenterDTO | []>{
    return this.auth.register(user, this.uuid.generate());
  }

  public async login(user: UserLoginDTO){
    return this.auth.login(user);
  }

  public async update(user: UserUpdaterDTO){
    
  }

  public async delete(user: UserDeleteDTO){
    // const userSearch = await this.getUserSecretInfoByUsername(user.username)
    
    // if(!userSearch){
    //   throw new UserDoesntExist()
    // }

    // if(!this.passwordHash.compare(userSearch.password, user.password)){
    //   throw new UserPasswordDontMatch();
    // }

    // this.user.delete(user.id);
  }

  public async getUserById(id: String): Promise<UserPresenterDTO>{
    const result = await this.user.findUnique({
      where: {
        id: id
      }
    })

    if(!result){
      throw new UserDoesntExist()
    }

    return {
      img: result.img,
      username: result.username
    }
  }

  async getUserByUsername(username: String): Promise<UserPresenterDTO>{
    const result = await this.user.findUnique({
      where: {
        username: username
      }
    })

    if(!result){
      throw new UserDoesntExist();
    }

    return {
      img: result.img,
      username: result.username
    }
  }

  async getAllUsers(userPermission: PermissionVerificationDTO){
    
  }
}
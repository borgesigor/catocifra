import DatabaseAdapter from "../adapters/DatabaseAdapter";
import UUIDGeneratorAdapter from "../adapters/UUIDGenerator";
import UserRepository from "../../aplication/repository/UserRepository";
import AuthService from "./AuthService";

import { 
  UserCreatorDTO, 
  UserUpdaterDTO, 
  UserDeleteDTO, 
  UserLoginDTO,
  UserPresenterDTO
} from "../../shared/dtos/UserDTO";

import {
  UserDoesntExist,
  DoNotHavePermission,
} from "../../shared/errorHandlers/Errors";

export default class UserService{
  private database: DatabaseAdapter = new DatabaseAdapter();
  private uuid: UUIDGeneratorAdapter = new UUIDGeneratorAdapter();
  private user: UserRepository = new UserRepository(this.database);
  private auth: AuthService = new AuthService(this.database);

  public async register(user: UserCreatorDTO){
    return await this.auth.register(user, this.uuid.generate());
  }

  public async login(user: UserLoginDTO){
    return await this.auth.login(user);
  }

  public async recoveryPassword(){
    
  }

  public async update(data: UserUpdaterDTO): Promise<UserPresenterDTO>{

    const decodeToken = await this.auth.verifyAndDecodeToken(data.verification.token);
    const getDataById = await this.getUserById(data.verification.id)

    if(!(decodeToken.id == data.verification.id)){
      throw new DoNotHavePermission()
    }

    await this.user.update({
      id: data.verification.id,
      username: data.data.username || getDataById.username,
      img: data.data.img || getDataById.img
    })

    return {
      id: getDataById.id
    }

  }

  public async delete(user: UserDeleteDTO): Promise<UserPresenterDTO>{

    const decodeToken = await this.auth.verifyAndDecodeToken(user.token);

    if(!(decodeToken.id == user.id)){
      throw new DoNotHavePermission()
    }

    await this.user.delete(user.id)

    return {
      id: user.id
    }

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
      id: result.id,
      username: result.username,
      img: result.img,
      createdAt: result.createdAt,
      isAdmin: result.isAdmin
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
      id: result.id,
      username: result.username,
      img: result.img,
      createdAt: result.createdAt,
      isAdmin: result.isAdmin
    }

  }
}
import IDatabaseContext from "../../aplication/context/IDatabaseContext";
import IUUIDContext from "../../aplication/context/IUUIDContext";
import ITokenContext from "../../aplication/context/ITokenContext";
import UserRepository from "../../aplication/repository/UserRepository";

import { UserCreatorDTO, UserUpdaterDTO, UserDeleterDTO, UserLoginDTO } from "../../aplication/dtos/UserDTO";

export default class UserService{
  constructor(
    private database: IDatabaseContext,
    private uuid: IUUIDContext,
    private token: ITokenContext,
  ){}

  private user: UserRepository = new UserRepository(this.database);

  async register(user: UserCreatorDTO){
    if(await this.getUserByUsername(user.username)){
      return new Error("Este nome de usuário já existe")
    }

    return this.user.create({
      id: this.uuid.generate(),
      img: user.img,
      username: user.username,
      password: user.password,
      createdAt: new Date().toISOString()
    });
  }

  async login(user: UserLoginDTO){
    const userSearch = await this.getUserByUsername(user.username)

    if(!userSearch){
      return new Error(`Nome de usuário inválido`)
    }

    if(userSearch.password !== user.password){
      return new Error(`Senha inválida`)
    }

    const token = this.token.sign({
      username: user.username
    })

    return token
  }

  async update(user: UserUpdaterDTO){
    if(await this.getUserById(user.id)){
      return new Error("Este usuário não existe")
    }

    this.user.update({
      id: this.uuid.generate(),
      img: user.img,
      username: user.username,
      password: user.password
    })
  }

  async delete(user: UserDeleterDTO){
    if(await this.getUserById(user.id)){
      return new Error("Este usuário não existe")
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
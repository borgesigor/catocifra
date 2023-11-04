import UserRepository from "../../aplication/repository/UserRepository";
import IUUIDContext from "../../aplication/context/IUUIDContext";
import IDatabaseContext from "../../aplication/context/IDatabaseContext";
import { UserCreatorDTO, UserUpdaterDTO, UserDeleterDTO } from "../../aplication/dtos/UserDTO";
import { ITokenContext } from "../../aplication/context/ITokenContext";

export default class UserService{
  constructor(
    private uuid: IUUIDContext,
    private database: IDatabaseContext
  ){}

  private user: UserRepository = new UserRepository(this.database);

  async register(user: UserCreatorDTO){
    if(typeof this.getUserByUsername == "undefined"){
      throw new Error("Já existe um usuário com este username")
    }

    this.user.create({
      id: this.uuid.generate(),
      img: user.img,
      username: user.username,
      password: user.password,
      createdAt: new Date().toISOString()
    });
  }

  async update(user: UserUpdaterDTO){
    this.user.update({
      id: this.uuid.generate(),
      img: user.img,
      username: user.username,
      password: user.password
    })
  }

  async delete(user: UserDeleterDTO){
    // checagens
    this.user.delete(user.id);
  }

  async getUserByUsername(username: String){
    return this.user.findUnique({
      where: {
        username: username
      }
    })
  }
}
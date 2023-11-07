import TokenAdapter from "../adapters/TokenAdapter";
import PasswordHashAdapter from "../adapters/PasswordHashAdapter";
import UserRepository from "../../aplication/repository/UserRepository";
import IDatabaseContext from "../../shared/context/IDatabaseContext";

import { 
  UserLoginDTO,
  UserCreatorDTO,
  UserPresenterDTO
} from "../../shared/dtos/UserDTO";

import { 
  UserPasswordDontMatch,
  UserDoesntExist,
  UserUsernameAlreadyExists
} from "../../shared/errorHandlers/Errors";

export default class AuthService{
  constructor(
    private database: IDatabaseContext
  ){}

  private token: TokenAdapter = new TokenAdapter();
  private passwordHash: PasswordHashAdapter = new PasswordHashAdapter();
  private user: UserRepository = new UserRepository(this.database);

  private async getUserSecretInfoByUsername(username: String){
    const result = await this.user.findUnique({
      where: {
        username: username
      }
    })

    return result
  }

  private async generateUserToken(username: String){
    const token = this.token.sign({
      username: username
    })

    return token
  }

  private async tryLogin(user: UserLoginDTO){
    const userSearch = await this.getUserSecretInfoByUsername(user.username)

    if(!userSearch){
      throw new UserDoesntExist();
    }

    const passwordCorresponds = await this.passwordHash.compare(user.password, userSearch.password)

    if(!passwordCorresponds){
      throw new UserPasswordDontMatch();
    }
    
    return true
  }

  public async register(user: UserCreatorDTO, uuid: String): Promise<UserPresenterDTO | []>{
    if(await this.getUserSecretInfoByUsername(user.username)){
      throw new UserUsernameAlreadyExists()
    }

    const hashPassword = await this.passwordHash.hash(user.password)

    const result = await this.user.create({
      id: uuid,
      img: user.img,
      username: user.username,
      password: new String(hashPassword),
      createdAt: new Date().toISOString()
    })

    return result as []
  }

  public async login(user: UserLoginDTO){
    if(await this.tryLogin(user)){
      return {
        user: user.username,
        token: await this.generateUserToken(user.username)
      }
    }
  }
}
import TokenAdapter from "../adapters/TokenAdapter";
import PasswordHashAdapter from "../adapters/PasswordHashAdapter";
import UserRepository from "../../aplication/repository/UserRepository";
import IDatabaseContext from "../../shared/context/IDatabaseContext";

import { 
  UserLoginDTO,
  UserCreatorDTO
} from "../../shared/dtos/UserDTO";

import { 
  UserPasswordDontMatch,
  UserDoesntExist,
  UserUsernameAlreadyExists,
  TokenIsntValid,
  UnexpectedError
} from "../../shared/errorHandlers/Errors";

interface RegisterPresenter{
  id: String,
  username: String,
  createdAt: String
}

interface LoginPresenter{
  id: String,
  username: String
  token: String,
  createdAt: String
}

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

  private async tryLogin(user: UserLoginDTO){
    const userSearch = await this.getUserSecretInfoByUsername(user.username)

    if(!userSearch){
      throw new UserDoesntExist();
    }

    const passwordCorresponds = await this.passwordHash.compare(user.password, userSearch.password)

    if(!passwordCorresponds){
      throw new UserPasswordDontMatch();
    }
    
    return userSearch
  }

  // 

  public async verifyAndDecodeToken(token: String){
    if(!await this.token.isValid(token)){
      throw new TokenIsntValid()
    }

    return await this.token.decode(token)
  }

  public async register(user: UserCreatorDTO, uuid: String): Promise<RegisterPresenter>{

    if(await this.getUserSecretInfoByUsername(user.username)){
      throw new UserUsernameAlreadyExists()
    }

    const hashPassword = await this.passwordHash.hash(user.password)
    const date = new Date().toISOString()

    await this.user.create({
      id: uuid,
      img: user.img,
      username: user.username,
      password: hashPassword,
      createdAt: date,
      isAdmin: false
    })

    return {
      id: uuid,
      username: user.username,
      createdAt: date
    }

  }

  public async login(user: UserLoginDTO): Promise<LoginPresenter>{
    
    const tryLogin = await this.tryLogin(user)

    if(!tryLogin){
      throw new UnexpectedError("login")
    }

    const generateToken = await this.token.sign({
      id: tryLogin.id,
      username: user.username,
      isAdmin: tryLogin.isAdmin
    })

    return {
      id: tryLogin.id,
      username: tryLogin.username,
      token: generateToken,
      createdAt: tryLogin.createdAt
    }

  }
}
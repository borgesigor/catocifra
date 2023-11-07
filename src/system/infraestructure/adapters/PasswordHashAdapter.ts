import bcrypt from 'bcrypt'
import { UnexpectedError } from '../../shared/errorHandlers/Errors';

const SaltRounds = 10

export default class PasswordHashAdapter{

  async hash(password: String){
    return await bcrypt.hash(password.toString(), SaltRounds)
    .catch((err)=>{
      throw new UnexpectedError(err);
    })
  }

  async compare(password: String, encryptedPassword: String){
    return await bcrypt.compare(password.toString(), encryptedPassword.toString())
    .catch((err)=>{
      throw new UnexpectedError(err);
    })
  }
}
import bcrypt from 'bcrypt'
import { UnexpectedError } from '../errorHandlers/Errors';

const SaltRounds = 10

export default class PasswordHashAdapter{

  async hash(password: String){
    return await bcrypt.hash(password.toString(), SaltRounds)
    .catch((err)=>{
      throw new UnexpectedError(err);
    })
  }

  async verify(password: String, passwordToCompare: String){
    return await bcrypt.compare(password.toString(), passwordToCompare.toString())
    .catch((err)=>{
      throw new UnexpectedError(err);
    })
  }
}
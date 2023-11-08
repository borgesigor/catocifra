import jwt from 'jsonwebtoken';
import { ITokenContextForAdapter } from '../../shared/context/ITokenContext';

const secretKey: string = "igorlindo&rico"

export default class TokenAdapter{
  private token: ITokenContextForAdapter = jwt;

  async sign(payload: Object){
    return await this.token.sign(payload, secretKey, {
      expiresIn: '1d'
    })
  }

  async isValid(token: String){
    try{
      await this.token.verify(token.toString(), secretKey)
      return true
    }catch(err){
      return false
    }
  }

  async decode(token: String){
    return await this.token.decode(token.toString())
  }
}
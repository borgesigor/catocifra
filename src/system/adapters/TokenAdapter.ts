import jwt from 'jsonwebtoken';
import { ITokenContextForAdapter } from '../aplication/context/ITokenContext';

const secretKey: string = "igorlindo&rico"

export default class TokenAdapter{
  private token: ITokenContextForAdapter = jwt

  sign(payload: Object){
    return this.token.sign(payload, secretKey, {
      expiresIn: '1d'
    })
  }

  verify(token: string){
    try{
      this.token.verify(token, secretKey)
      return true
    }catch(err){
      return false
    }
  }

  decode(token: string){
    return this.token.decode(token)
  }
}
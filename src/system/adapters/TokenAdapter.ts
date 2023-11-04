import jwt from 'jsonwebtoken';
import { ITokenContext } from '../aplication/context/ITokenContext';

const secretKey: string = "igorlindo&rico"

interface TokenOptions{
  expiresIn: string
}

interface Payload{
  id: String,
  username: String
}

export default class TokenAdapter{
  private token: ITokenContext = jwt

  sign(payload: Payload, options?: TokenOptions){
    return this.token.sign(payload, secretKey, {
      expiresIn: options?.expiresIn || '1h'
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
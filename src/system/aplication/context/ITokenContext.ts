export default interface ITokenContext{
  sign(payload: Object): string,
  verify(token: string): any,
  decode(token: string): any
}

export interface ITokenContextForAdapter{
  sign(payload: Object, secretOrPrivateKey: string, options?: Object): string,
  verify(token: string, secretOrPublicKey: string, options?: Object): any,
  decode(token: string, options?: Object): any
}
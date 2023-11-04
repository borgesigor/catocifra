export interface ITokenContext{
  sign(payload: Object, secretOrPrivateKey: string, options?: Object): string,
  verify(token: string, secretOrPublicKey: string, options?: Object): any,
  decode(token: string, options?: Object): any
}
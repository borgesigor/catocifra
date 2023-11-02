export interface Request{

}

export interface Response{
  status(code: Number): any;
  json(data: Object): Object;
}

interface IHttpContext {
  get(path: String, handler: Array<any>): void
}

export default IHttpContext
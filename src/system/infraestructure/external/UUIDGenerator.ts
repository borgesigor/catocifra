import { v4 as uuid } from "uuid";

export interface IUUIDGenerator{
  generate(): String;
}

export default class UUIDGeneratorAdapter implements IUUIDGenerator{
  private uuid: String;

  constructor(){
    this.uuid = uuid()
  }

  generate(): String {
    return this.uuid;
  }
}
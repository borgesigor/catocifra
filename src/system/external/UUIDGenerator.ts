import { v4 as uuid } from "uuid";
import IUUIDGenerator from "../aplication/adapters/IUUIDGenerator";

export default class UUIDGeneratorAdapter implements IUUIDGenerator{
  private uuid: String;

  constructor(){
    this.uuid = uuid()
  }

  generate(): String {
    return this.uuid;
  }
}
import { v4 as uuid } from "uuid";
import IUUIDGenerator from "./dto/IUUID";

export default class UUIDGeneratorAdapter implements IUUIDGenerator{
  private uuid: String;

  constructor(){
    this.uuid = uuid()
  }

  generate(): String {
    return this.uuid;
  }
}
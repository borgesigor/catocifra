import { v4 as uuid } from 'uuid';
import IUUIDGenerator from "../../aplication/context/IUUIDContext";

export default class UUIDGeneratorAdapter implements IUUIDGenerator{
  private uuid: String = uuid()

  generate(): String {
    return this.uuid;
  }
}
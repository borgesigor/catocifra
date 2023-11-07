import escaper from './helpers/escaper'
import IDatabase, { Create, Delete, FindMany, FindUnique, Update } from '../../aplication/context/IDatabaseContext'
import { Client } from 'pg'
import { UnexpectedError } from '../errorHandlers/Errors'

const dbOptions = {
  host: "localhost",
  port: 5432,
  database: "Cifras",
  user: "postgres",
  password: "2121"
}

interface IResult{
  rows: [Object],
  rowCount: number
}

interface IClient{
  query(query: String): Promise<IResult>
  connect(): Promise<void>
}

class DatabaseAdapter implements IDatabase{
  private db: IClient

  constructor(){
    this.db = new Client(dbOptions)
    this.db.connect().catch((err)=>{
      throw new UnexpectedError(err)
    })
  }

  async create(table: String, data: Create): Promise<Object> {
    const columns = escaper(data.data).key;
    const values = escaper(data.data).value;
    const query = `INSERT INTO "${table}"(${columns}) VALUES (${values})`;
    
    const result = await this.db.query(query).catch((err)=>{
      throw new UnexpectedError(err)
    })

    return result.rows
  }

  async findMany(table: String, args?: FindMany): Promise<Object> {
    if(!args) { 
      args = {} 
    }

    const where = args.where ? `WHERE ${escaper(args.where).translate}` : "";
    const order = args.order ? `ORDER BY ${args.order.by} ${args.order.direction || 'DESC'}` : "";
    const paginator = args.take ? `LIMIT ${args.take} OFFSET ${args.take * (args.skip || 0)};` : "";
    const query = `SELECT * FROM "${table}" ${where} ${order} ${paginator}`;

    const result = await this.db.query(query).catch((err)=>{
      throw new UnexpectedError(err)
    })

    return result.rows
  }

  async findUnique(table: String, args: FindUnique): Promise<Object> {
    const where = escaper(args.where).translate;
    const query = `SELECT * FROM "${table}" WHERE ${where} LIMIT 1`;

    const result = await this.db.query(query).catch((err)=>{
      throw new UnexpectedError(err)
    })

    return result.rows[0]
  }
  
  async update(table: String, args: Update): Promise<Object> {
    const data = escaper(args.data).translate2
    const where = escaper(args.where).translate
    const query = `UPDATE "${table}" SET ${data} WHERE ${where}`

    return await this.db.query(query).catch((err)=>{
      throw new UnexpectedError(err)
    })
  }

  async delete(table: String, args: Delete): Promise<Object> {
    const where = escaper(args.where).translate
    const query = `DELETE FROM "${table}" WHERE ${where}`

    return await this.db.query(query).catch((err)=>{
      throw new UnexpectedError(err)
    })
  }
}

export default DatabaseAdapter


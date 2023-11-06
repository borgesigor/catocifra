import escaper from './helpers/escaper'
import { Client, Pool } from 'pg'
import IDatabase, { Create, Delete, FindMany, FindUnique, Update } from './dto/IDatabase'

const dbOptions = {
  host: "localhost",
  port: 5432,
  database: "Cifras",
  user: "postgres",
  password: "2121"
}

class DatabaseAdapter implements IDatabase{
  private db: Client;

  constructor() {
    this.db = new Client(dbOptions);
    this.db.connect();
  }

  async create(table: String, data: Create): Promise<Object> {
    const columns = escaper(data.data).key;
    const values = escaper(data.data).value;
    const query = `INSERT INTO "${table}"(${columns}) VALUES (${values})`;
    
    try {
      const result = await this.db.query(query)
      return result.rows
    } catch (error) {
      throw error
    }
  }

  async findMany(table: String, args?: FindMany): Promise<Object> {
    if(!args) { 
      args = {} 
    }
    const where = args.where ? `WHERE ${escaper(args.where).translate}` : "";
    const order = args.order ? `ORDER BY ${args.order.by} ${args.order.direction || 'DESC'}` : "";
    const paginator = args.take ? `LIMIT ${args.take} OFFSET ${args.take * (args.skip || 0)};` : "";
    const query = `SELECT * FROM "${table}" ${where} ${order} ${paginator}`;

    try {
      const result = await this.db.query(query)
      return result.rows
    } catch (error) {
      throw error
    }
  }

  async findUnique(table: String, args: FindUnique): Promise<Object> {
    const where = escaper(args.where).translate;
    const query = `SELECT * FROM "${table}" WHERE ${where} LIMIT 1`;

    try {
      const result = await this.db.query(query)
      if(result.rowCount > 0){
        return result.rows[0]
      }else{
        return false
      }
    } catch (error) {
      throw error
    }
  }

  
  async update(table: String, args: Update): Promise<Object> {
    const data = escaper(args.data).translate2
    const where = escaper(args.where).translate
    const query = `UPDATE "${table}" SET ${data} WHERE ${where}`

    try {
      const result = await this.db.query(query)
      return result.rows
    } catch (error) {
      throw error
    }
  }

  async delete(table: String, args: Delete): Promise<Object> {
    const where = escaper(args.where).translate
    const query = `DELETE FROM "${table}" WHERE ${where}`

    try {
      const result = await this.db.query(query)
      return result.rows
    } catch (error) {
      throw error
    }
  }
}

export default DatabaseAdapter


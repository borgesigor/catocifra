import { Client } from 'pg'

// const dbOptions = {
//   host: "localhost",
//   port: 5432,
//   database: "Cifras",
//   user: "postgres",
//   password: "2121"
// }

import IDatabase, { Create, Delete, FindMany, FindUnique, Update } from './dto/IDatabase'

class DatabaseAdapter implements IDatabase{
  private db: Client

  constructor(dbOptions: Object) {
    this.db = new Client(dbOptions)
  }

  private escape(escape: Object){
    let keys = Object.keys(escape);
    let values = Object.values(escape);

    let keysMap = keys.map(e => {
      return this.db.escapeIdentifier(e)
    }).join(', ')
  
    let valuesMap = values.map(e => {
      return this.db.escapeLiteral(e)
    }).join(', ')

    let translate = Object.entries(escape).map(([key, value]) => `"${key}"='${value}'`).join(' AND ');
    let translate2 = Object.entries(escape).map(([key, value]) => `"${key}"='${value}'`).join(', ');

    return {
      key: keysMap,
      value: valuesMap,
      translate: translate,
      translate2: translate2
    }
  }

  async create(table: String, data: Create): Promise<Object> {
    await this.db.connect();
    const columns = this.escape(data.data).key;
    const values = this.escape(data.data).value;
    const query = `INSERT INTO "${table}"(${columns}) VALUES (${values})`;
    
    return await this.db.query(query)
    .then((res)=>{
      return {
        length: res.rowCount,
        data: res.rows
      }
    })
    .catch((err)=>{
      console.log(err)
      return false
    })
    .finally(()=>{ this.db.end() })
  }

  async findUnique(table: String, args: FindUnique): Promise<Object> {
    await this.db.connect();
    const where = this.escape(args.where).translate;
    const query = `SELECT * FROM "${table}" WHERE ${where} LIMIT 1`;

    return await this.db.query(query)
    .then((res)=>{
      return {
        length: res.rowCount,
        data: res.rows
      }
    })
    .catch((err)=>{
      console.log(err)
      return false
    })
    .finally(()=>{ this.db.end() })
  }

  async findMany(table: String, args: FindMany): Promise<Object> {
    await this.db.connect()
    const where = args.where ? `WHERE ${this.escape(args.where).translate}` : "";
    const order = args.order ? `ORDER BY ${args.order.by} ${args.order.direction || 'DESC'}` : "";
    const paginator = args.take ? `LIMIT ${args.take} OFFSET ${args.take * (args.skip || 0)};` : "";
    const query = `SELECT * FROM "${table}" ${where} ${order} ${paginator}`;

    return await this.db.query(query)
    .then((res)=>{
      return {
        length: res.rowCount,
        data: res.rows
      }
    })
    .catch((err)=>{
      console.log(err)
      return false
    })
    .finally(()=>{ this.db.end() })
  }
  
  async update(table: String, args: Update): Promise<Object> {
    await this.db.connect()
    const data = this.escape(args.data).translate2
    const where = this.escape(args.where).translate
    const query = `UPDATE "${table}" SET ${data} WHERE ${where}`

    return await this.db.query(query)
    .then((res)=>{
      return {
        length: res.rowCount,
        data: res.rows
      }
    })
    .catch((err)=>{
      console.log(err)
      return false
    })
    .finally(()=>{ this.db.end() })
  }

  async delete(table: String, args: Delete): Promise<Object> {
    await this.db.connect()
    const where = this.escape(args.where).translate
    const query = `DELETE FROM "${table}" WHERE ${where}`

    return await this.db.query(query)
    .then((res)=>{
      return {
        length: res.rowCount,
        data: res.rows
      }
    })
    .catch((err)=>{
      console.log(err)
      return false
    })
    .finally(()=>{ this.db.end() })
  }
}

export default DatabaseAdapter


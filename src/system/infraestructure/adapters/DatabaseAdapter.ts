import escaper from './helpers/escaper'
import IDatabase, { Create, Delete, FindMany, FindUnique, Update } from '../../shared/context/IDatabaseContext'
import { Client } from 'pg'
import { UnexpectedError } from '../../shared/errorHandlers/Errors'

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
  query(query: String, values?: any): Promise<IResult>
  connect(): Promise<void>
}

class DatabaseAdapter implements IDatabase{
  private db: Client = new Client(dbOptions);

  constructor(){
    this.db.connect().catch((err)=>{
      throw new UnexpectedError(err)
    })
  }

  async create(table: String, args: Create): Promise<Object> {
    let [dataKeys, dataValues] = [Object.keys(args.data), Object.values(args.data)]

    let values = dataKeys.map((e, index)=>{
      return `$${index+1}`
    })

    const updatedDataKeys = dataKeys.map(e => `"${e}"`).join(', ');

    const query = {
      text: `INSERT INTO "${table}"(${updatedDataKeys}) VALUES (${values})`,
      values: dataValues
    }

    return await this.db.query(query).catch((err)=>{
      throw new UnexpectedError(err)
    })
  }

  async findMany(table: String, args?: FindMany): Promise<Object> {
    let where = ""
    let order = ""
    let paginator = "LIMIT 20"
    let whereDataValues = []

    if(args?.where){
      let [whereKeys, whereData] = [Object.keys(args.where), Object.values(args.where)]
      const updatedWhereKeys = whereKeys.map((key, index) => `"${key}"=$${index + 1}`).join(" AND ");
      where = `WHERE ${updatedWhereKeys}`
      whereDataValues = whereData
    }

    if(args?.order){
      let [orderKeys, orderData] = [args.order.by, args.order.direction]
      order = `ORDER BY "${orderKeys}" ${args.order.direction || 'DESC'}`
    }

    if(args?.take){
      if(args.take > 50){ args.take = 50 }
      paginator = `LIMIT ${args.take || ""} OFFSET ${args.take * (args.skip || 0)}`;
    }

    const query = {
      text: `SELECT * FROM "${table}" ${where} ${order} ${paginator}`,
      values: whereDataValues
    }

    const result = await this.db.query(query).catch((err)=>{
      throw new UnexpectedError(err)
    })

    return result.rows
  }

  async findUnique(table: String, args: FindUnique): Promise<Object> {

    let [whereKeys, whereData] = [Object.keys(args.where), Object.values(args.where)]

    const updatedWhereKeys = whereKeys.map((key, index) => `"${key}"=$${index + 1}`).join(" AND ");

    const query = {
      text: `SELECT * FROM "${table}" WHERE ${updatedWhereKeys}`,
      values: whereData
    }

    const result = await this.db.query(query).catch((err)=>{
      throw new UnexpectedError(err)
    })

    return result.rows[0]
  }
  
  async update(table: String, args: Update): Promise<Object> {

    let [dataKeys, dataValues] = [Object.keys(args.data), Object.values(args.data)]
    let [whereKeys, whereData] = [Object.keys(args.where), Object.values(args.where)]

    const updatedDataKeys = dataKeys.map((key, index) => `"${key}"=$${index + 1}`).join(', ');
    const updatedWhereKeys = whereKeys.map((key, index) => `"${key}"=$${dataKeys.length + index + 1}`).join(" AND ");
    const values = [...dataValues, ...whereData]

    const query = {
      text: `UPDATE "${table}" SET ${updatedDataKeys} WHERE ${updatedWhereKeys}`,
      values
    }

    return await this.db.query(query).catch((err)=>{
      throw new UnexpectedError(err)
    })
  }

  async delete(table: String, args: Delete): Promise<Object> {
    let [whereKeys, whereData] = [Object.keys(args.where), Object.values(args.where)]

    const updatedWhereKeys = whereKeys.map((key, index) => `"${key}"=$${index + 1}`).join(" AND ");

    const query = {
      text: `DELETE FROM "${table}" WHERE ${updatedWhereKeys}`,
      values: whereData
    }

    return await this.db.query(query).catch((err)=>{
      throw new UnexpectedError(err)
    })
  }
}

export default DatabaseAdapter


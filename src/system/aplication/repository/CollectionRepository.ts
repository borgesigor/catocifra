import Collection from "../../core/entity/Collection";
import CollectionUseCases from "../../core/usecases/CollectionUseCases"
import IDatabase from "../adapters/IDatabaseContext";
import FindArguments  from '../../core/utility/FindArguments'
import Paginator from "../helpers/SQLPagination";

const tableName = "Collection"

class CollectionRepository implements CollectionUseCases{
  constructor(
    private database: IDatabase
  ){}

  async create(args: Collection): Promise<void>{
    const query = `
      INSERT INTO "${tableName}"(id, name, author, createdAt) 
      VALUES('${args.id}', '${args.name}', '${args.authorId}', '${args.createdAt}')
    `
    await this.database.rawQuery(query);
  }

  async read(id: String): Promise<Object>{
    const query = `
      SELECT * FROM "${tableName}" 
      WHERE id=${id}
    `
    let result = await this.database.rawQuery(query);
    return result;
  }

  async update(args: Collection): Promise<void>{
    const query = `
      UPDATE "${tableName}" 
      SET 
      name=${args.name},
      author=${args.authorId}
      WHERE
      id=${args.id}
    `
    await this.database.rawQuery(query);
  }

  async delete(id: String): Promise<void>{
    const query = `
      DELETE FROM "${tableName}"
      WHERE
      id=${id}
    `
    await this.database.rawQuery(query);
  }

  async findByUsername(args: FindArguments): Promise<Object[]>{
    const query = `
      SELECT * FROM 
      "${tableName}"
      WHERE
      authorId=${args.query}
    `
    const result = await this.database.rawQuery(query);
    return result as Object[]
  }

  async findById(args: FindArguments): Promise<Object>{
    const query = `
      SELECT * FROM
      "${tableName}"
      WHERE
      id=${args.query}
    `
    const result = await this.database.rawQuery(query);
    return result as Object
  }
}

export default CollectionRepository
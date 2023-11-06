export interface Create{
  data: Object
}

export interface FindUnique{
  where: Object
}

interface Order{
  by: String,
  direction?: String
}

export interface FindMany{
  where?: Object,
  order?: Order,
  take?: number,
  skip?: number 
}

export interface Update{
  where: Object,
  data: Object
}

export interface Delete{
  where: Object,
}

export default interface Database {
  create(table: String, args: Create): Promise<Object>;
  findMany(table: String, args: FindMany): Promise<Object>;
  findUnique(table: String, args: FindUnique): Promise<Object>;
  update(table: String, args: Update): Promise<Object>;
  delete(table: String, args: Delete): Promise<Object>;
}
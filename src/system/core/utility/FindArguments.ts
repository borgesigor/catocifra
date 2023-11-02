interface Query{
  search?: String;
}

export default interface Args{
  query?: Query;
  resultLimit?: Number;
  page?: Number
}
// // import Server from './api/server/Server'
// import Teste from './testes/CifraTests' 

// const server = new Teste()
// server.dbTeste()
// server.start()

// import CifraService from "./system/infraestructure/service/CifraService";
// import DatabaseAdapter from "./system/adapters/DatabaseAdapter";
// import UUIDGeneratorAdapter from "./system/adapters/UUIDGenerator";

// const cifra = new CifraService(new UUIDGeneratorAdapter(), new DatabaseAdapter())

import TokenAdapter from "./system/adapters/TokenAdapter";

let sign = new TokenAdapter().sign({ id: '2323223', username: 'igorblima' })
let verify = new TokenAdapter().decode(sign)

console.log(sign)
console.log(verify)
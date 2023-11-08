import { Client } from "pg";
const client = new Client()

function escapeIdentifier(text: string) {
  return client.escapeIdentifier(text)
}

function escapeLiteral(text: string) {
  return client.escapeLiteral(text)
}

export default function escaper(escape: Object){
  let [keys, values] = [Object.keys(escape), Object.values(escape)]

  let keysMap = keys.map(e => {
    return e
  }).join(', ')

  let valuesMap = values.map(e => {
    return e
  }).join(', ')

  let translateWithAnd = Object.entries(escape).map(([key, value]) => `${escapeIdentifier(key)}=${escapeLiteral(value)}`).join(' AND ');
  let translateWithVirgula = Object.entries(escape).map(([key, value]) => `${escapeIdentifier(key)}=${escapeLiteral(value)}`).join(', ');
  let withCounter = Object.entries(escape).map(([key, value]) => {
  })
  
  console.log(withCounter.length)
  
  return {
    key: keysMap,
    value: valuesMap,
    translateWithAnd,
    translateWithVirgula
  }
}
import { Client } from "pg";
const client = new Client()

function escapeIdentifier(text: string) {
  return client.escapeIdentifier(text)
}

function escapeLiteral(text: string) {
  return client.escapeLiteral(text)
}

export default function escaper(escape: Object){
  let keys = Object.keys(escape);
  let values = Object.values(escape);

  let keysMap = keys.map(e => {
    return escapeIdentifier(e)
  }).join(', ')

  let valuesMap = values.map(e => {
    return escapeLiteral(e)
  }).join(', ')

  let translateWithAnd = Object.entries(escape).map(([key, value]) => `${escapeIdentifier(key)}=${escapeLiteral(value)}`).join(' AND ');
  let translateWithVirgula = Object.entries(escape).map(([key, value]) => `${escapeIdentifier(key)}=${escapeLiteral(value)}`).join(', ');

  return {
    key: keysMap,
    value: valuesMap,
    translateWithAnd,
    translateWithVirgula
  }
}
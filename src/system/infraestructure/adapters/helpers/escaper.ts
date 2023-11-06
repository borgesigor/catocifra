import { Client } from "pg";
const client = new Client()

function escapeIdentifier(identifier: string): string {
  // Verifica se o identificador começa com um número ou contém caracteres não alfanuméricos.
  if (/^[0-9]|[^a-zA-Z0-9_]/.test(identifier)) {
      // Adiciona um sublinhado no início do identificador.
      return "_" + identifier;
  }
  return identifier;
}

function escapeLiteral(value: string | number | boolean): string {
  if (typeof value === 'string') {
    // Escapa caracteres especiais em strings
    return `'${value.replace(/'/g, "''")}'`;
  } else if (typeof value === 'number' || typeof value === 'boolean') {
    // Valores numéricos e booleanos não precisam de aspas
    return value.toString();
  } else {
    throw new Error('Tipo de valor não suportado para escapeLiteral');
  }
}

export default function escaper(escape: Object){
  let keys = Object.keys(escape);
  let values = Object.values(escape);

  let keysMap = keys.map(e => {
    return client.escapeIdentifier(e)
  }).join(', ')

  let valuesMap = values.map(e => {
    return client.escapeLiteral(e)
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
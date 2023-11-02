export default function extractKeysAndValues(data: Object): { chaves: string, valores: string } {
  const chaves = Object.keys(data).map(chave => `"${chave}"`).join(', ');
  const valores = Object.values(data).map(valor => `'${valor}'`).join(', ');

  return { chaves, valores };
}
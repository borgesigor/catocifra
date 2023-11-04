import CifraService from '../src/system/infraestructure/service/CifraService'
import UUIDGenerator from '../src/system/adapters/UUIDGenerator'
import Database from '../src/system/adapters/DatabaseAdapter'

describe('cifra aplications', ()=>{
  const cifraService = new CifraService(new UUIDGenerator(), new Database())

  it('create cifra', async () => {
    const createCifra = await cifraService.create({
      title: 'Please Please Me',
      artist: 'The Beatles',
      content: 'E, A, B'
    })
    expect(createCifra).toBe(true)
  })
})
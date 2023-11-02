import CifraService from '../src/system/infraestructure/service/CifraService'

describe('cifra aplications', ()=>{
  it('create cifra', () => {
    const cifraRepo = new CifraService();
    const cifra = cifraRepo.create({
      title: 'ok',
      artist: 'tes',
      content: 'k'
    })
    expect(cifra)
  })
})
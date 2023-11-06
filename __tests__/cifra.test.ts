import UserService from '../src/system/infraestructure/service/UserService'

function gerarCodigoAleatorio() {
  const caracteresPermitidos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let codigo = '';

  for (let i = 0; i < 20; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
    codigo += caracteresPermitidos.charAt(indiceAleatorio);
  }

  return codigo;
}

describe('user service', ()=>{
  it('create user', async () => {
    const userService = new UserService()
    const user = await userService.register({
      img: 'teste',
      password: '212132',
      username: `igorbissddgor`
    })
    expect(user).toBe(true)
  })

  it('find user by username', async () => {
    const userService = new UserService()
    const user = await userService.getUserByUsername('sYeitoNINvLQkC15fMPE')
    expect(typeof user == "object").toBe(true)
  })

  it('login user', async () => {
    const userService = new UserService()
    const user = await userService.login({
      username: 'igorbissddgor',
      password: '212132j'
    })
    expect(user).toBe('user')
  })
})
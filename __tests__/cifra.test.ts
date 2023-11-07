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

const userService = new UserService();

// describe('user service', ()=>{
//   it('create user', ()=>{
//     const register = userService.register({
//       img: 'random-img',
//       username: `igorblima`,
//       password: '212132'
//     })
//     expect(register).toBe(true)
//   })
// })
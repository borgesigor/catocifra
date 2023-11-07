import UserService from "./system/infraestructure/service/UserService";

function gerarCodigoAleatorio() {
  const caracteresPermitidos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let codigo = '';

  for (let i = 0; i < 20; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
    codigo += caracteresPermitidos.charAt(indiceAleatorio);
  }

  return codigo;
}


async function teste(){
  try {
    const user = new UserService()
    // await user.register({img: 'random', username: 'ibl', password: '212132'})
    let teste = await user.login({username: 'ibl', password: '212132'})
    console.log(teste)
  } catch (error) {
    console.log(error)
  }
}

teste()
import UserService from "./system/infraestructure/service/UserService";
import DatabaseAdapter from "./system/infraestructure/adapters/DatabaseAdapter";

function gerarCodigoAleatorio() {
  const caracteresPermitidos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let codigo = '';

  for (let i = 0; i < 20; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
    codigo += caracteresPermitidos.charAt(indiceAleatorio);
  }

  return codigo;
}


const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU0MTJkYjc0LTM3OGItNDdiZi1iNmRiLTNkNzU2ODMzMWEyYyIsInVzZXJuYW1lIjoiaWdvcmJsaW1hIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY5OTQwODEzNiwiZXhwIjoxNjk5NDk0NTM2fQ.1d3usM5mD-tASZpIv4Go3qHTYGl9xTN1vx_R_qQW1yo`

async function register(){
  try {
    const user = new UserService()
    const has = await user.register({
      username: 'igorblima',
      password: '212132',
      img: 'src/'
    })
    console.log(has)
  } catch (error) {
    console.log(error)
  }
}

async function login(){
  try {
    const user = new UserService()
    const has = await user.login({ 
      username: 'igorblima', 
      password: '212132' 
    })
    console.log(has)
  } catch (error) {
    console.log(error)
  }
}

async function delete2(){
  try {
    const user = new UserService()
    const has = await user.delete({
      id: 'igorblima',
      token: token
    })
    console.log(has)
  } catch (error) {
    console.log(error)
  }
}

async function update(){
  try {
    const user = new UserService()
    const has = await user.update({
      verification: {
        id: '5412db74-378b-47bf-b6db-3d7568331a2c',
        token: token
      },
      data: {
        img: 'browtf'
      }
    })
    console.log(has)
  } catch (error) {
    console.log(error)
  }
}

// register()
// login()
// delete2()
// update()
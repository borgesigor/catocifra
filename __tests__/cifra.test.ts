import UserService from '../src/system/infraestructure/service/UserService'
const userService = new UserService();

describe('user service', ()=>{
  const User = {
    img: 'coolurlimage',
    username: 'cooluser',
    password: 'coolpasword',
    token: '',
    id: ''
  }

  it('create user', async ()=>{
    const result = await userService.register(User)
    expect(typeof result == "object").toBe(true)
  })

  it('login user', async ()=>{
    const result = await userService.login(User)
    User.token = result.token.toString();
    User.id = result.id.toString();
    expect(typeof result == "object").toBe(true)
  })

  it('get user by id', async ()=>{
    const result = await userService.getUserById(User.id)
    expect(typeof result == "object").toBe(true)
  })

  it('get user by username', async ()=>{
    const result = await userService.getUserByUsername(User.username)
    expect(typeof result == "object").toBe(true)
  })

  it('update user', async ()=>{
    const result = await userService.update({
      verification: {
        id: User.id,
        token: User.token
      },
      data: {
        username: 'mynewcoolusername'
      }
    })
    expect(typeof result == "object").toBe(true)
  })

  it('delete user', async ()=>{
    const result = await userService.delete({
      token: User.token,
      id: User.id
    })
    expect(typeof result == "object").toBe(true)
  })
})
export class UnexpectedError extends Error{
  constructor(err: any){
    console.log(` `)
    console.log(`[ERRO NÃO TRATADO] ${err}`)
    console.log(` `)
    super("Ocorreu um erro inexperado")
    this.name = "UNEXPECTED_ERROR"
  }
}

export class UserUsernameAlreadyExists extends Error{
  constructor(){
    super("Este nome de usuário já está cadastrado")
    this.name = "USER_USERNAME_ALREADY_EXISTS"
  }
}

export class UserPasswordDontMatch extends Error{
  constructor(){
    super("Senha incorreta.")
    this.name = "USER_PASSWORD_DONT_MATCH"
  }
}

export class UserDoesntExist extends Error{
  constructor(){
    super("Esta conta não existe")
    this.name = "USER_NOT_EXISTS"
  }
}

export class TokenIsntValid extends Error{
  constructor(){
    super("Este token é inválido")
    this.name = "INVALID_TOKEN"
  }
}


export class DoNotHavePermission extends Error{
  constructor(){
    super("Sem Permissão")
    this.name = "DO_NOT_HAVE_PERMISSION"
  }
}
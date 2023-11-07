export class UnexpectedError extends Error{
  constructor(err: any){
    console.log(` `)
    console.log(`[ERRO NÃO TRATADO] ${err}`)
    console.log(` `)
    super("Ocorreu um erro inexperado")
    this.name = "UnexpectedError"
  }
}

export class UserUsernameAlreadyExists extends Error{
  constructor(){
    super("Este nome de usuário já está cadastrado")
    this.name = "UserUsernameAlreadyExists"
  }
}

export class UserPasswordDontMatch extends Error{
  constructor(){
    super("Senha incorreta.")
    this.name = "UserPasswordDontMatch"
  }
}

export class UserDoesntExist extends Error{
  constructor(){
    super("Esta conta não existe")
    this.name = "UserDoesntExist"
  }
}
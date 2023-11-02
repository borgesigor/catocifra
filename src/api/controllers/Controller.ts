import CifraController from './Controllers/CifraController'

export default class Controller{

  constructor(private router: any) {}

  Index(){
    this.router.get('/', (req: any, res: any) => {
      res.send({
        author: 'Igor Borges'
      })
    })
    return this.router
  }

  Cifra() {
    return new CifraController(this.router).Router()
  }
}
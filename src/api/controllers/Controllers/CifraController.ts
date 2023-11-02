import CifraRepository from "../../../aplication/repository/CifraRepository"
import DatabaseAdapter from "../../../external/DatabaseAdapter"

export default class CifraController{
  constructor(private router: any) {}

  Router() {
    const cifra = new CifraRepository(new DatabaseAdapter)

    this.router.get('/', async (req: any, res: any)=>{
      const result = await cifra.findAll({
        resultLimit: 20,
        page: 0
      })

      res.status(200).json({ result })
    })

    this.router.get('/:artist/:title', async (req: any, res: any)=>{
      const result = await cifra.findAll({
        resultLimit: 20,
        page: 0
      })

      res.status(200).json({ result })
    })

    return this.router
  }
}
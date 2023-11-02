import Express, { Router } from 'express';
const app = Express();
const router = Router()
import Controller from '../controllers/Controller';

export default class Server{
  async start() {
    app.use('/', new Controller(router).Index())
    app.use('/cifras', new Controller(router).Cifra())
    // app.use(new Controller(router).Cifra())

    app.listen(3000, () => {
      console.log('[OK] Servidor iniciado')
    })
  }
}
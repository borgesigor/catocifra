// import scrapper from 'puppeteer';
// import Cifra from './core/entity/Cifra'

// class ScrappingCifra {
//   async Scrapping(pageUrl: string): Promise<Object> {
//     const browser = await scrapper.launch({ headless: 'new' })  // headless: false, devtools: true
//     const page = await browser.newPage();

//     let resourcesTypes = [
//       'fetch',
//       'image',
//       'media',
//       'font'
//     ]

//     page.on ( 'request', async request => {
//       resourcesTypes.forEach(e => {
//         if(e === request.resourceType()){
//           request.abort ()
//         }else{
//           request.continue ()
//         }
//       });
//     });

//     await page.setViewport({width: 1920, height: 1080});
//     await page.goto(pageUrl, { waitUntil: 'domcontentloaded' });
//     let textSelector = await page.waitForSelector('pre')
//     let pageContent = await textSelector!.evaluate(
//       (el) => {
//         if(el){
//           el.innerHTML
//         }
//       },
//       await page.$('body')
//     );
    
//     page.close();

//     return {
//       title: '',
//       artist: 'ok',
//       content: pageContent
//     } as Cifra
//   }
// }
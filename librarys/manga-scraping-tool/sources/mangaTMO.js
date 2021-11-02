const Source_base = require('../source_base.js');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

const mangaTMO = new Source_base();
mangaTMO.setBaseURl('https://lectortmo.com/');
mangaTMO.setSearchUrl('https://lectortmo.com/library?_pg=1&title=');
mangaTMO.setChapterUrl('https://lectortmo.com/library/manga/');
mangaTMO.setItemSeparating('+');
mangaTMO.setViewerUrl('https://lectortmo.com/viewer/');
mangaTMO.setName('TuMangaOnline');


/**
 * Returns an array of manga objects each manga  containes a name, state, author, last_chapter, chapterURL} 
 * @param {String} input nombre del manga a buscar 
 */
mangaTMO.search = async function(input)
{
        const  hola = await puppeteer.launch({ headless: false }).then(async browser => {
        const page = await browser.newPage();
      
        await page.goto(input).catch((error) => {
            console.error("La pagina demoro mucho en cargar", error);
        });

        await page.waitForSelector('div[data-identifier]').catch((error) => {
            console.error("El selector no aparecio", error);
        });
     
        
        const resultados = await page.$$eval('div[data-identifier]',  res => {
           
            const resultadosMangas = [];
            res.forEach(element => {
                resultadosMangas.push( {
                   name: element.querySelector('a > div > div[class=thumbnail-title] > h4 ').textContent,
                   state:"Unknown",
                   author: "Author: Unknown",
                   last_chapter: "Last chapter: Unknown",
                   chapterURL:element.querySelector('a').href,
                }); 
            });
           
            return resultadosMangas;
        });

        await browser.close();

        return resultados;
    });

    return hola;
}


mangaTMO.searchChapters = async function(input)
{
    const res = await fetch(input);
    const body = await res.text();
    const $ = await cheerio.load(body);

    const resultadosCaps = [];
    const resultados = $('.chapter-list');
    resultados.each(function(i,e)
    {
        resultadosCaps.push(resultados.eq(i).children().first().children().first().children().eq(5).children().first().attr('href'));
    });
    return resultadosCaps;
}


mangaTMO.generateChapterHTML = async function(input)
{
 
    const  res = await fetch(input);
    let aux = res.url;
    aux = aux.replace("paginated", "cascade");

    const resImages = await fetch(aux);
    const body = await resImages.text();
    const $ = await cheerio.load(body);

    const urlPaginas = [];
    const resultados = $('.img-container');
    resultados.each(function(i,e)
    {
        urlPaginas.push(resultados.children().eq(i).attr('data-src'));
    });
    let imgsHTML = "";
    urlPaginas.forEach(element => {
        imgsHTML += `<div> <img src = ${element}></div> \n`;
    });
    const mangaChapter = `<html> \n <head> \n </head> \n <body> \n  <div style='text-align: center;'> \n${imgsHTML} \n  </div> \n </body>\n</html>`;
  
    return mangaChapter ;

}

//mangaTMO.search('https://lectortmo.com/library?_pg=1&title=grand');
module.exports = mangaTMO;

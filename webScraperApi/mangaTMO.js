const Source_base = require('./source_base.js');
const fetch = require('node-fetch');
const cheerio = require('cheerio');


const mangaTMO = new Source_base();
mangaTMO.setBaseURl('https://lectortmo.com/');
mangaTMO.setSearchUrl('https://lectortmo.com/library?_page=1&title=');
mangaTMO.setChapterUrl('http://fanfox.net/manga/');
mangaTMO.setItemSeparating('+');
mangaTMO.setViewerUrl('http://fanfox.net/manga/');
mangaTMO.setName('TuMangaOnline');


mangaTMO.search = async function(input)
{
    const res = await fetch(input);
    const body = await res.text();
    const $ = await cheerio.load(body);

    const resultadosMangas = [];
    const resultados = $('.element');
    resultados.each(function(i,e)
    {
        resultadosMangas[i] = {
            name: $(this).children().first().children().first().children().eq(1).children().first().attr("title"),
            state: "Unknown",
            author: "Author: Unknown",
            last_chapter: "Last chapter: Unknown",
            chapterURL: $(this).children().first().attr("href"),
        };
    });
    return resultadosMangas;

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
module.exports = mangaTMO;
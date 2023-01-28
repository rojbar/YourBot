//manga fox requires a headless browser or an api that executes javascript code

/** 
const Source_base = require('../source_base.js');
const mangaFox = new Source_base();
const fetch = require('node-fetch');
const cheerio = require('cheerio');
mangaFox.setBaseURl('http://fanfox.net/');
mangaFox.setSearchUrl('http://fanfox.net/search?title=');
mangaFox.setChapterUrl('http://fanfox.net/manga/');
mangaFox.setItemSeparating('+');
mangaFox.setViewerUrl('http://fanfox.net/manga/');
mangaFox.setName('MangaFox');
mangaFox.search = async function(input)
{
    const res = await fetch(input);
    const body = await res.text();
    const $ = await cheerio.load(body);

    const resultadosMangas = [];
    const resultados = $('li');
    resultados.each(function(i,e)
    {
        resultadosMangas[i] = {
            name: $(this).first().children().first().attr("title"),
            state: $(this).first().children().eq(2).text(),
            author: $(this).first().children().eq(3).text(),
            last_chapter: $(this).first().children().eq(4).text(),

        };
    });
    return resultadosMangas;
}
module.exports = mangaFox;

*/
"use strict";
/**
 * Source_base
 * Representa el objeto base de una fuente, tiene como funcion el  realizar busquedas de mangas en la fuente, consultar el manga, y retornar imagenes
 */
class Source_base {
    constructor() {
        this.base_url = "";
        this.search_url = "";
        this.itemSeparating = "";
        this.chapterUrl = "";
        this.viewerUrl = "";
        this.name = "";
    }
    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    setBaseURl(base_url) {
        this.base_url = base_url;
    }
    setSearchUrl(search_url) {
        this.search_url = search_url;
    }
    setItemSeparating(itemSeparating) {
        this.itemSeparating = itemSeparating;
    }
    setChapterUrl(chapterUrl) {
        this.chapterUrl = chapterUrl;
    }
    setViewerUrl(viewerUrl) {
        this.viewerUrl = viewerUrl;
    }
    getBaseUrl() {
        return this.base_url;
    }
    getSearchUrl() {
        return this.search_url;
    }
    getItemSeparating() {
        return this.itemSeparating;
    }
    getChapterUrl() {
        return this.chapterUrl;
    }
    getViewerUrl() {
        return this.viewerUrl;
    }
    /**
     * search retrieves the manga results from the search on the website where input is the search
     * @param {string} input
     * @returns Array[string]
     */
    search(input) {
        return false;
    }
    /**
     * Formats the search with the  itemSeperatingWordsInSearch variable
     */
    formatSearch(input) {
        let searchable = "";
        input.forEach(element => {
            searchable = searchable.concat(element);
            searchable = searchable.concat(this.itemSeparating);
        });
        return searchable;
    }
    /**
     * searChapter searches the available chapters, and returns and array with their url
     * @param {URL} input
     */
    async searchChapters(input) {
    }
    /**
     * searChapter returns a string that is a html, containing the images of the chapter
     * @param {URL} input
     */
    async generateChapterHTML(input) {
    }
}
module.exports = Source_base;

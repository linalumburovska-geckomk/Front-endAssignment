const $ = require('jquery')
let clicked ='';
let layersGlobal=[];
let index=-1;

sessionStorage.setItem("clicked",clicked)
sessionStorage.setItem("layersGlobal", JSON.stringify(layersGlobal))
sessionStorage.setItem("index",index)

class Main {

    constructor(){
        this.pageMap = {}
        this.currentPage = null
        this.data = {}
    }

    load(url) {
        return $.ajax({
                async: true,
                url: "steps/"+url+".html",
                type: 'GET',
            }).then( (data) => {
                $('#root').empty()
                $('#root').append(data)
            })
    }

    forward(url,page) {
        if (this.isPageValid(page)) {
            this.pageMap[url] = page
        }
        if (typeof this.pageMap[url] !== 'undefined') {
            this.currentPage = this.pageMap[url]
            let self = this
            this.load(url).then(() => {
                self.currentPage.init()
            }).catch( (e) => {
                console.error(e)
            })
            // Implement the history api from the browser
            window.history.pushState(url, null, url);
            window.addEventListener("popstate", (e) => {  
                let character = e.state
                if (character == null) {
                    self.currentPage = self.pageMap['step1']
                    self.load('step1').then(() => {
                        self.currentPage.init()
                    }).catch( (e) => {
                        console.error(e)
                    })
                } else {
                    self.currentPage = self.pageMap[character]
                    self.load(character).then( () => {
                        self.currentPage.init()
                    }).catch( (e) => {
                        console.error(e)
                    })    
                }
                
            })
        }
    }

    isPageValid(page) {
        return typeof page['init'] === 'function'
    }

}

module.exports = Main
var $ = require('jquery')
var clicked ='';
var layersGlobal=[];
var index=-1;

sessionStorage.setItem("clicked",clicked)
sessionStorage.setItem("layersGlobal", JSON.stringify(layersGlobal))
sessionStorage.setItem("index",index)

class Main {

    constructor(){
        this.pageMap = {}
        this.currentPage = null
        this.data = {}
    }

    addPage(url,page) {
        if (this.isPageValid(page)) {
            this.pageMap[url] = page
        }
    }

    load(url) {
        return $.ajax({
                async: true,
                url: url+".html",
                type: 'GET',
            }).then(function(data){
                $('#root').empty()
                $('#root').append(data)
            })
    }

    forward(url) {
        if (typeof this.pageMap[url] !== 'undefined') {
            this.currentPage = this.pageMap[url]
            var self = this
            this.load(url).then(function() {
                self.currentPage.init()
            }).catch(function(e) {
                console.error(e)
            })
            // Implement the history api from the browser
            window.history.pushState(url, null, url);
            window.addEventListener("popstate", function(e){  
                var character = e.state
                if (character == null) {
                    self.currentPage = self.pageMap['step1']
                    self.load('step1').then(function() {
                        self.currentPage.init()
                    }).catch(function(e) {
                        console.error(e)
                    })
                } else {
                    self.currentPage = self.pageMap[character]
                    self.load(character).then(function() {
                        self.currentPage.init()
                    }).catch(function(e) {
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
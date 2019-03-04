var clicked ='';
var layersGlobal=[];
var index=-1;

var App = function() {
    this.pageMap = {}
    this.currentPage = null
    this.data = {}
}

sessionStorage.setItem("clicked",clicked)
sessionStorage.setItem("layersGlobal", JSON.stringify(layersGlobal))
sessionStorage.setItem("index",index)

App.prototype.addPage = function(url, page) {
    if (this.isPageValid(page)) {
        this.pageMap[url] = page
    }
}

App.prototype.forward = function(url) {
    if (typeof this.pageMap[url] !== 'undefined') {
        this.currentPage = this.pageMap[url]
        var self = this
        this.currentPage.load().then(function() {
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
                self.currentPage.load().then(function() {
                    self.currentPage.init()
                }).catch(function(e) {
                    console.error(e)
                })
            } else {
                self.currentPage = self.pageMap[character]
                self.currentPage.load().then(function() {
                    self.currentPage.init()
                }).catch(function(e) {
                    console.error(e)
                })    
            }
            
        })
    }
}

App.prototype.isPageValid = function(page) {
    var loadState = typeof page['load'] === 'function'
    var initState = typeof page['init'] === 'function'
    return loadState && initState
}

module.exports = App
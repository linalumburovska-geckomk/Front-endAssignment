(function(){
   
    define(function(require){

        var clicked ='';
        var layersGlobal=[];
        var index=-1;
    
        localStorage.setItem("clicked",clicked)
        localStorage.setItem("layersGlobal", JSON.stringify(layersGlobal))
        localStorage.setItem("index",index)    
    
    
        var $=require('jquery')
        
    
        var App = function() {
            this.pageMap = {}
            this.currentPage = null
            this.data = {}
        }
    
        App.prototype.addPage = function(url, page) {
            if (this.isPageValid(page)) {
                this.pageMap[url] = page
            }
        }
    
        App.prototype.forward = function(url) {
            if (typeof this.pageMap[url] !== 'undefined') {
                if (this.currentPage !== null) {
                    this.currentPage.dispose()
                }
                this.currentPage = this.pageMap[url]
                var self = this
                this.currentPage.load().then(function() {
                    self.currentPage.init()
                }).catch(function(e) {
                    console.error(e)
                })
                // Implement the history api from the browser
            }
        }
    
        App.prototype.isPageValid = function(page) {
            var loadState = typeof page['load'] === 'function'
            var initState = typeof page['init'] === 'function'
            var disposeState = typeof page['dispose'] === 'function'
            return loadState && initState && disposeState
        }
    
        return App;
    });
})()



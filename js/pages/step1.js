(function(){

    define (function(require){

        var $ = require('jquery');
       
    
        var Step1Page = function(app) {
            this.app = app
        }
    
        Step1Page.prototype.load = function() {
            return new Promise(function(resolve) {
                $.ajax({
                    async: true,
                    url: "step1.html",
                    type: 'GET',
                    success: function(data) {
                        $('#root').empty()
                        $('#root').append(data)
                        resolve()
                    }
                });
            })
        }
    
        Step1Page.prototype.init = function() {
            var self = this
            $('#button1').on('click', function(e) {
                e.preventDefault()
                self.app.forward('step2')
            })
        }
        
        
        Step1Page.prototype.dispose = function() {
        }
    
        return Step1Page;
    });
})();


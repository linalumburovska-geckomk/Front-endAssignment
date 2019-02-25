(function(){
    
    define(function(require){

        var $ = require('jquery')
        
    
        var Step3Page = function(app) {
            this.app = app
        }
        
        Step3Page.prototype.load = function() {
            return new Promise(function(resolve) {
                $.ajax({
                    async: true,
                    url: "step3.html",
                    type: 'GET',
                    success: function(data) {
                        $('#root').empty()
                        $('#root').append(data)
                        resolve()
                    }
                });
            })
        }
        
        Step3Page.prototype.init = function() {
            $('#nameFeed').append(sessionStorage.getItem('name',name))
            var self=this
            $("#createLayer").on('click', function(){
                self.app.forward('step4')
            })
        
        }
        
        Step3Page.prototype.dispose = function() {
        }
    
        return Step3Page;
    });

})();



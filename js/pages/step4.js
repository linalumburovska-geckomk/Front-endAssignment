(function(){

    define(function(require){

        layersGlobal=JSON.parse(sessionStorage.getItem('layersGlobal'))
    
        var $=require('jquery')
        require('bootstrap')
        
        var Step4Page = function(app) {
            this.app = app
        }
        
        Step4Page.prototype.load = function() {
            return new Promise(function(resolve) {
                $.ajax({
                    async: true,
                    url: "step4.html",
                    type: 'GET',
                    success: function(data) {
                        $('#root').empty()
                        $('#root').append(data)
                        resolve()
                    }
                });
            })
        }
        
        Step4Page.prototype.init = function() {
            var self=this
            $('#backStep4').on('click', function(){
                self.app.forward('step3')
            })
        
            $('#saveStep4').on('click', function(){
                var nameStep4=$("#nameStep4").val()
                var isValueExisted=valueExists(layersGlobal,nameStep4)

                if($.sanitize(nameStep4)==-1) {
                    $('#errorValue').hide()
                    $('#errorName').hide()
                    $('#sanitizeName').show()
                } else {
                    if(nameStep4=='') {
                        $('#sanitizeName').hide()
                        $('#errorValue').hide()
                        $('#errorName').show()
                    } else {
                        if(isValueExisted===true) {
                            $('#sanitizeName').hide()
                            $('#errorName').hide()
                            $('#errorValue').show()
                        } else {
                            $('#modalSaveLayer').modal('show');
                            layersGlobal.push(nameStep4)
                            setTimeout(
                                function() {
                                    $('#modalSaveLayer').modal('hide')
                                    self.app.forward('step5')
                                }, 1500);
                        }
                    }
                }
            })
        }
        
        Step4Page.prototype.dispose = function() {
        
        }
    
        function valueExists(layers, name) {
            for(var i=0; i<layers.length;i++){
                if(layers[i]===name) {
                    return true;
                }
            }
            return false;
        }

        $.sanitize = function(input) {
            var output = input.replace(/<script[^>]*?>.*?<\/script>/gi, '').
                         replace(/<[\/\!]*?[^<>]*?>/gi, '').
                         replace(/<style[^>]*?>.*?<\/style>/gi, '').
                         replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
            if(input==output){
                return output;
            } else {
                return -1;
            }
        };
        
        return Step4Page;
    
    });

})();


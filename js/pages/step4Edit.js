(function(){
    
    define(function(require){

        var $ = require('jquery')
        require('bootstrap')

        var Step4EditPage = function(app) {
            this.app = app
        }

        Step4EditPage.prototype.load = function() {
            return new Promise(function(resolve) {
                $.ajax({
                    async: true,
                    url: "step4Edit.html",
                    type: 'GET',
                    success: function(data) {
                        $('#root').empty()
                        $('#root').append(data)
                        resolve()
                    }
                });
            })
        }

        Step4EditPage.prototype.init = function() {
            $("#nameEdit").val(this.app.data['edit'])

            var self=this
            $("#backStep4Edit").on('click', function(){
                self.app.forward('step3')        
            })

            $("#saveStep4Edit").on('click', function(){
                var nameStep4=$("#nameEdit").val()
                var isValueExisted=valueExists(layersGlobal,nameStep4)
                if(nameStep4=='') {
                    $('#errorValue').hide()
                    $('#errorName').show()
                } else {
                    if(isValueExisted===true) {
                        $('#errorName').hide()
                        $('#errorValue').show()
                    } else if(nameStep4!=''){
                        $('#modalEditLayer').modal('show');
                        layersGlobal[index]=nameStep4
                        setTimeout(
                            function() {
                                $('#modalEditLayer').modal('hide');
                                self.app.forward('step5')
                            }, 1500);
                        }
                }
            })

        }

        Step4EditPage.prototype.dispose = function() {    
        }

        function valueExists(layers, name) {
            for(var i=0; i<layers.length;i++){
                if(layers[i]===name) {
                    return true;
                }
            }
            return false;
        }

        return Step4EditPage;

    });

})();

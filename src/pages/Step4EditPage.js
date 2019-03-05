var $ = require('jquery')

$.getScript( "/plugins.js")

var index
var layersGlobal
var clicked

class Step4EditPage {
    constructor(app){
        this.app=app
    }

    init() {
        index=sessionStorage.getItem('index')
        layersGlobal = JSON.parse(sessionStorage.getItem('layersGlobal'))
        clicked = sessionStorage.getItem('clicked')
        $("#nameEdit").val(clicked)
    
        var self=this
        $("#backStep4Edit").on('click', function(){
            self.app.forward('step3')        
        })
    
        $("#saveStep4Edit").on('click', function(){
            var nameStep4=$("#nameEdit").val()
            var isValueExisted=valueExists(layersGlobal,nameStep4)
    
            if($("#nameEdit").sanitize()==-1) {
                $('#errorValue, #errorName').hide()
                $('#sanitizeName').show()
            } else {
                if(nameStep4=='') {
                    $('#sanitizeName, #errorValue').hide()
                    $('#errorName').show()
                } else {
                    if(isValueExisted===true) {
                        $('#sanitizeName, #errorName').hide()
                        $('#errorValue').show()
                    } else if(nameStep4!=''){
                        $('#modalEditLayer').modal('show')
                        layersGlobal[index]=nameStep4
                        sessionStorage.setItem("layersGlobal",JSON.stringify(layersGlobal))
                        setTimeout(
                            function() {
                                $('#modalEditLayer').modal('hide')
                                self.app.forward('step5')
                            }, 1500);
                        }
                }
            }
    
        })    
    }
}

const valueExists = (layers, name) => {
    for(var i=0; i<layers.length;i++){
        if(layers[i]===name) {
            return true;
        }
    }
    return false;
}

module.exports = Step4EditPage
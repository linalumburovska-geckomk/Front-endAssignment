var $=require('jquery')

$.getScript( "/plugins.js")

var layersGlobal = null

class Step4Page {

    constructor(app){
        this.app=app
    }

    load() {
        return $.ajax({
            async: true,
            url: "step4.html",
            type: 'GET',
        }).then(function(data){
            $('#root').empty()
            $('#root').append(data)
        })
    }
  
    init() {
        layersGlobal=JSON.parse(sessionStorage.getItem('layersGlobal'))
        var self=this
        $('#backStep4').on('click', function(){
            self.app.forward('step3')
        })
    
        $('#saveStep4').on('click', function(){
            var nameStep4=$("#nameStep4").val()
            var isValueExisted=valueExists(layersGlobal,nameStep4)
            
            if($("#nameStep4").sanitize()==-1) {
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
                    } else {
                        $('#modalSaveLayer').modal('show')
                        layersGlobal.push(nameStep4)
                        sessionStorage.setItem("layersGlobal",JSON.stringify(layersGlobal))
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
}

const valueExists = (layers,name) => {
    for(var i=0; i<layers.length;i++){
        if(layers[i]===name) {
            return true;
        }
    }
    return false;
}


module.exports = Step4Page
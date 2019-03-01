var $ = require('jquery')

$.getScript( "/plugins.js")

var index
var layersGlobal
var clicked

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

module.exports = Step4EditPage
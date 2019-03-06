const $=require('jquery')
const Step5Page = require('./Step5Page')

$.getScript( "/external/plugins.js")

let layersGlobal = null

class Step4Page {

    constructor(app){
        this.app=app
    }

    init() {
        layersGlobal=JSON.parse(sessionStorage.getItem('layersGlobal'))
        let self=this
        $('#backStep4').on('click', () => {
            self.app.forward('step3', self.app.pageMap['step3'])
        })
    
        $('#saveStep4').on('click', () => {

            let nameStep4Id = $("#nameStep4")
            let errorNameId = $('#errorName'), sanitizeNameId = $('#sanitizeName'), errorValueId = $("#errorValue")

            let nameStep4=nameStep4Id.val()
            let isValueExisted=valueExists(layersGlobal,nameStep4)            
            
            if(nameStep4Id.sanitize()==-1) {
                errorValueId.add(errorNameId).hide()
                sanitizeNameId.show()
            } else {
                if(nameStep4=='') {
                    sanitizeNameId.add(errorValueId).hide()
                    errorNameId.show()
                } else {
                    if(isValueExisted===true) {
                        sanitizeNameId.add(errorNameId).hide()
                        errorValueId.show()
                    } else {
                        let modalSaveId = $('#modalSaveLayer')

                        modalSaveId.modal('show')
                        layersGlobal.push(nameStep4)
                        sessionStorage.setItem("layersGlobal",JSON.stringify(layersGlobal))
                        setTimeout(
                            () => {
                                modalSaveId.modal('hide')
                                self.app.forward('step5', new Step5Page(self.app))
                            }, 1500);
                    }
                }
            }
        })
    }
}

const valueExists = (layers,name) => {
    for(let i=0; i<layers.length;i++){
        if(layers[i]===name) {
            return true;
        }
    }
    return false;
}


module.exports = Step4Page
const { $ } = require('../dom')

let index
let layersGlobal
let clicked

class Step4EditPage {

    constructor(app){
        this.app=app
    }

    init() { 
        // debugger
        index=sessionStorage.getItem('index')
        layersGlobal = JSON.parse(sessionStorage.getItem('layersGlobal'))
        clicked = sessionStorage.getItem('clicked')
        $("#nameEdit").setValue(clicked)
    
        let self=this
        $("#backStep4Edit").on('click', () => {
            self.app.forward('step3', self.app.pageMap['step3'])        
        })
    
        $("#saveStep4Edit").on('click', () => {

            let nameEditId = $("#nameEdit")
            let errorNameId = $('#errorName'), sanitizeNameId = $('#sanitizeName'), errorValueId = $("#errorValue")

            let nameStep4=nameEditId.val()
            let isValueExisted=valueExists(layersGlobal,nameStep4)
    
            if(nameEditId.sanitize()==-1) {
                errorValueId.hide(), errorNameId.hide()
                sanitizeNameId.show()
            } else {
                if(nameStep4=='') {
                    sanitizeNameId.hide(), errorValueId.hide()
                    errorNameId.show()
                } else {
                    if(isValueExisted===true) {
                        sanitizeNameId.hide, errorNameId.hide()
                        errorValueId.show()
                    } else if(nameStep4!=''){
                        let modalEditId = $('#modalEditLayer')

                        modalEditId.modal('show')
                        layersGlobal[index]=nameStep4
                        sessionStorage.setItem("layersGlobal",JSON.stringify(layersGlobal))
                        setTimeout(
                            () => {
                                modalEditId.modal('hide')
                                self.app.forward('step5',self.app.pageMap['step5'])
                            }, 1500);
                        }
                }
            }
    
        })    
    }
}

const valueExists = (layers, name) => {
    for(let i=0; i<layers.length;i++){
        if(layers[i]===name) {
            return true;
        }
    }
    return false;
}

module.exports = Step4EditPage
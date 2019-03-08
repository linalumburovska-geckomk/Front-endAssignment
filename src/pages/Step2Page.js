const { $ } = require('../dom')
const Step3Page = require('./Step3Page')

let name="",desc="",image=""


class Step2Page {
    
    constructor(app) {
        this.app=app
    }

    init() {
        let self = this
        $('#back').on('click', () => {
            self.app.forward('step1',self.app.pageMap['step1'])
        })
        $('#save').on('click', () => {

            let nameId=$('#name'), descId=$('#description'),imageId=$('#imageURL')
            let errorNameId = $('#errorName'), errorDescId = $('#errorDescription'), errorImageId = $('#errorImage')
            let sanitizeNameId = $('#sanitizeName'), sanitizeDescId = $('#sanitizeDescription'), sanitizeImageId = $("#sanitizeImage")

            // Secure input, checks if all input fields are valid
            if(nameId.sanitize()==-1) {
                errorNameId.hide(), errorDescId.hide(),errorImageId.hide(),sanitizeDescId.hide(),sanitizeImageId.hide()
                sanitizeNameId.show()         
            } else if(descId.sanitize()==-1) {
                errorNameId.hide() ,errorDescId.hide(),errorImageId.hide(),sanitizeNameId.hide(),sanitizeImageId.hide()
                sanitizeDescId.show()   
            } else if(imageId.sanitize()==-1) {
                errorNameId.hide(), errorDescId.hide() ,errorImageId.hide() ,sanitizeNameId.hide() ,sanitizeDescId.hide() 
                sanitizeImageId.show()
            } else {
                //If they are secure, checks if every field that is requred is not empty
                name=nameId.sanitize()
                desc=descId.sanitize()
                image=imageId.sanitize()

                if(name!='' &&  desc!='' &&  image!=''){
                    sessionStorage.setItem('name', name.toUpperCase())
                    self.app.forward('step3', new Step3Page(self.app))
                } else if(name!='' &&  desc=='' &&  image=='') {
                    sanitizeNameId.hide(),sanitizeDescId.hide(),sanitizeImageId.hide(), errorNameId.hide()                
                    errorDescId.show(),errorImageId.show()
                } else if(name=='' &&  desc!='' &&  image=='') {
                    sanitizeNameId.hide(),sanitizeDescId.hide(),sanitizeImageId.hide(),errorDescId.hide()
                    errorNameId.show(),errorImageId.show()
                } else if(name=='' &&  desc=='' &&  image!='') {
                    sanitizeNameId.hide(),sanitizeDescId.hide(),sanitizeImageId.hide(),errorImageId.hide()
                    errorNameId.show(),errorDescId.show()
                } else if(name!='' &&  desc!='' &&  image=='') {
                    sanitizeNameId.hide(),sanitizeDescId.hide(),sanitizeImageId.hide(),errorNameId.hide(),errorDescId.hide()
                    errorImageId.show()
                } else if(name!='' &&  desc=='' &&  image!='') {
                    sanitizeNameId.hide(),sanitizeDescId.hide(),sanitizeImageId.hide(),errorNameId.hide(),errorImageId.hide()
                    errorDescId.show()
                } else if(name=='' &&  desc!='' &&  image!='') {
                    sanitizeNameId.hide(),sanitizeDescId.hide(),sanitizeImageId.hide(),errorImageId.hide(),errorDescId.hide()
                    errorNameId.show()
                } else {
                    sanitizeNameId.hide(),sanitizeDescId.hide(),sanitizeImageId.hide()
                    errorNameId.show(),errorDescId.show(),errorImageId.show()
                }
            }                 
        })
    }
}

module.exports = Step2Page
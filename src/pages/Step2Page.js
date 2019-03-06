const $ = require('jquery')
const Step3Page = require('./Step3Page')
require("../../external/plugins")

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
                errorNameId.add(errorDescId).add(errorImageId).add(sanitizeDescId).add(sanitizeImageId).hide()
                sanitizeNameId.show()         
            } else if(descId.sanitize()==-1) {
                errorNameId.add(errorDescId).add(errorImageId).add(sanitizeNameId).add(sanitizeImageId).hide()
                sanitizeDescId.show()   
            } else if(imageId.sanitize()==-1) {
                errorNameId.add(errorDescId).add(errorImageId).add(sanitizeNameId).add(sanitizeDescId).hide()  
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
                    sanitizeNameId.add(sanitizeDescId).add(sanitizeImageId).add(errorNameId).hide()                   
                    errorDescId.add(errorImageId).show()
                } else if(name=='' &&  desc!='' &&  image=='') {
                    sanitizeNameId.add(sanitizeDescId).add(sanitizeImageId).add(errorDescId).hide()
                    errorNameId.add(errorImageId).show()
                } else if(name=='' &&  desc=='' &&  image!='') {
                    sanitizeNameId.add(sanitizeDescId).add(sanitizeImageId).add(errorImageId).hide()
                    errorNameId.add(errorDescId).show()
                } else if(name!='' &&  desc!='' &&  image=='') {
                    sanitizeNameId.add(sanitizeDescId).add(sanitizeImageId).add(errorNameId).add(errorDescId).hide()
                    errorImageId.show()
                } else if(name!='' &&  desc=='' &&  image!='') {
                    sanitizeNameId.add(sanitizeDescId).add(sanitizeImageId).add(errorNameId).add(errorImageId).hide()
                    errorDescId.show()
                } else if(name=='' &&  desc!='' &&  image!='') {
                    sanitizeNameId.add(sanitizeDescId).add(sanitizeImageId).add(errorImageId).add(errorDescId).hide()
                    errorNameId.show()
                } else {
                    sanitizeNameId.add(sanitizeDescId,sanitizeImageId).hide()
                    errorNameId.add(errorDescId).add(errorImageId).show()
                }
            }                 
        })
    }
}

module.exports = Step2Page
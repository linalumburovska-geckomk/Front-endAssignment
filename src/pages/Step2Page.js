var $ = require('jquery')
var Step3Page = require('./Step3Page')

var name=""
var desc=""
var image=""

$.getScript( "/plugins.js")

class Step2Page {
    constructor(app) {
        this.app=app
    }

    init() {
        var self = this
        $('#back').on('click', function() {
            self.app.forward('step1',self.app.pageMap['step1'])
        })
        $('#save').on('click', function() {
    
            name = $('#name').val()
            desc= $('#description').val()
            image = $('#imageURL').val()
            
            // Secure input, checks if all input fields are valid
            if($('#name').sanitize()==-1) {
                $('#errorName, #errorDescription, #errorImage, #sanitizeDescription, #sanitizeImage').hide()
                $('#sanitizeName').show()         
            } else if($('#description').sanitize()==-1) {
                $('#errorName, #errorDescription, #errorImage, #sanitizeName, #sanitizeImage').hide()  
                $('#sanitizeDescription').show()   
            } else if($('#imageURL').sanitize()==-1) {
                $('#errorName, #errorDescription, #errorImage, #sanitizeName, #sanitizeDescription ').hide()  
                $('#sanitizeImage').show()
            } else {
                //If they are secure, checks if every field that is requred is not empty
                name=$('#name').sanitize()
                desc=$('#description').sanitize()
                image=$('#imageURL').sanitize()
    
                
                if(name!='' &&  desc!='' &&  image!=''){
                    sessionStorage.setItem('name', name.toUpperCase())
                    self.app.forward('step3', new Step3Page(self.app))
                } else if(name!='' &&  desc=='' &&  image=='') {
                    $('#sanitizeName, #sanitizeDescription, #sanitizeImage, #errorName, #errorImage').hide()
                    $('#errorDescription, #errorImage').show()
                } else if(name=='' &&  desc!='' &&  image=='') {
                    $('#sanitizeName, #sanitizeDescription, #sanitizeImage, #errorDescription').hide()
                    $('#errorName, #errorImage').show()
                } else if(name=='' &&  desc=='' &&  image!='') {
                    $('#sanitizeName, #sanitizeDescription, #sanitizeImage, #errorImage').hide()
                    $('#errorName, #errorDescription').show()
                } else if(name!='' &&  desc!='' &&  image=='') {
                    $('#sanitizeName, #sanitizeDescription, #sanitizeImage, #errorName, #errorDescription').hide()
                    $('#errorImage').show()
                } else if(name!='' &&  desc=='' &&  image!='') {
                    $('#sanitizeName, #sanitizeDescription, #sanitizeImage, #errorName, #errorImage').hide()
                    $('#errorDescription').show()
                } else if(name=='' &&  desc!='' &&  image!='') {
                    $('#sanitizeName, #sanitizeDescription, #sanitizeImage, #errorDescription, #errorImage').hide()
                    $('#errorName').show()
                } else {
                    $('#sanitizeName, #sanitizeDescription, #sanitizeImage').hide()
                    $('#errorName, #errorDescription, #errorImage').show()
                }
            }
                            
        })
    }
}

module.exports = Step2Page
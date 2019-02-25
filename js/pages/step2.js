(function(){

    define (function(require){
    
        var $ = require('jquery')
        require('bootstrap')

        var name=""
        var desc=""
        var image=""

        $.getScript( "js/plugins.js")

        var Step2Page = function(app) {
            this.app = app
        }
        
        Step2Page.prototype.load = function() {
            return new Promise(function(resolve) {
                $.ajax({
                    async: true,
                    url: "step2.html",
                    type: 'GET',
                    success: function(data) {
                        $('#root').empty()
                        $('#root').append(data)
                        resolve()
                    }
                });
            })
        }
        
        Step2Page.prototype.init = function() {
            var self = this
            $('#back').on('click', function() {
                self.app.forward('step1')
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
                        self.app.forward('step3')
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
        
        Step2Page.prototype.dispose = function() {
            this.app.data['name'] = name.toUpperCase()
            this.app.data['description'] = desc
            this.app.data['imageurl'] = image
        }
    
        return Step2Page;
    });

})();


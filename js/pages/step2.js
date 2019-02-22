(function(){

    define (function(require){
    
        var $ = require('jquery')
        require('bootstrap')

        var name=""
        var desc=""
        var image=""

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
                if($.sanitize(name)==-1) {
                    $('#sanitizeName').show()    
                    $('#sanitizeDescription').hide()
                    $('#sanitizeImage').hide()               
                } else if($.sanitize(desc)==-1) {
                    $('#sanitizeName').hide()  
                    $('#sanitizeDescription').show()  
                    $('#sanitizeImage').hide()    
                } else if($.sanitize(image)==-1) {
                    $('#sanitizeName').hide()  
                    $('#sanitizeDescription').hide()
                    $('#sanitizeImage').show()
                } else {
                    //If they are secure, checks if every field that is requred is not empty
                    name=$.sanitize(name)
                    desc=$.sanitize(desc)
                    image=$.sanitize(image)

                    if(name!='' &&  desc!='' &&  image!=''){
                        self.app.forward('step3')
                    } else if(name!='' &&  desc=='' &&  image=='') {
                        $('#sanitizeName').hide()
                        $('#sanitizeDescription').hide()
                        $('#sanitizeImage').hide()
                        $('#errorName').hide()
                        $('#errorDescription').show()
                        $('#errorImage').show()
                    } else if(name=='' &&  desc!='' &&  image=='') {
                        $('#sanitizeName').hide()
                        $('#sanitizeDescription').hide()
                        $('#sanitizeImage').hide()
                        $('#errorName').show()
                        $('#errorDescription').hide()
                        $('#errorImage').show()
                    } else if(name=='' &&  desc=='' &&  image!='') {
                        $('#sanitizeName').hide()
                        $('#sanitizeDescription').hide()
                        $('#sanitizeImage').hide()
                        $('#errorName').show()
                        $('#errorDescription').show()
                        $('#errorImage').hide()
                    } else if(name!='' &&  desc!='' &&  image=='') {
                        $('#sanitizeName').hide()
                        $('#sanitizeDescription').hide()
                        $('#sanitizeImage').hide()
                        $('#errorName').hide()
                        $('#errorDescription').hide()
                        $('#errorImage').show()
                    } else if(name!='' &&  desc=='' &&  image!='') {
                        $('#sanitizeName').hide()
                        $('#sanitizeDescription').hide()
                        $('#sanitizeImage').hide()
                        $('#errorName').hide()
                        $('#errorDescription').show()
                        $('#errorImage').hide()
                    } else if(name=='' &&  desc!='' &&  image!='') {
                        $('#sanitizeName').hide()
                        $('#sanitizeDescription').hide()
                        $('#sanitizeImage').hide()
                        $('#errorName').show()
                        $('#errorDescription').hide()
                        $('#errorImage').hide()
                    } else {
                        $('#sanitizeName').hide()
                        $('#sanitizeDescription').hide()
                        $('#sanitizeImage').hide()
                        $('#errorName').show()
                        $('#errorDescription').show()
                        $('#errorImage').show()
                    }
                }
                               
            })
        }
        
        
        Step2Page.prototype.dispose = function() {
            this.app.data['name'] = name.toUpperCase()
            this.app.data['description'] = desc
            this.app.data['imageurl'] = image
        }


        $.sanitize = function(input) {
            var output = input.replace(/<script[^>]*?>.*?<\/script>/gi, '').
                         replace(/<[\/\!]*?[^<>]*?>/gi, '').
                         replace(/<style[^>]*?>.*?<\/style>/gi, '').
                         replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
            if(input==output){
                return output;
            } else {
                return -1;
            }
        };
    
        return Step2Page;
    });

})();


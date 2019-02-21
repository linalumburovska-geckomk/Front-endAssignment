(function(){

    define (function(require){
    
        var $ = require('jquery')
        
    
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
                var name = $('#name').val()
                var desc= $('#description').val()
                var image = $('#imageURL').val()
                if(name!='' &&  desc!='' &&  image!=''){
                    self.app.forward('step3')
                } else if(name!='' &&  desc=='' &&  image=='') {
                    $('#errorName').hide()
                    $('#errorDescription').show()
                    $('#errorImage').show()
                } else if(name=='' &&  desc!='' &&  image=='') {
                    $('#errorName').show()
                    $('#errorDescription').hide()
                    $('#errorImage').show()
                } else if(name=='' &&  desc=='' &&  image!='') {
                    $('#errorName').show()
                    $('#errorDescription').show()
                    $('#errorImage').hide()
                } else if(name!='' &&  desc!='' &&  image=='') {
                    $('#errorName').hide()
                    $('#errorDescription').hide()
                    $('#errorImage').show()
                } else if(name!='' &&  desc=='' &&  image!='') {
                    $('#errorName').hide()
                    $('#errorDescription').show()
                    $('#errorImage').hide()
                } else if(name=='' &&  desc!='' &&  image!='') {
                    $('#errorName').show()
                    $('#errorDescription').hide()
                    $('#errorImage').hide()
                } else {
                    $('#errorName').show()
                    $('#errorDescription').show()
                    $('#errorImage').show()
                }
            })
        }
        
        
        Step2Page.prototype.dispose = function() {
            this.app.data['name'] = $('#name').val().toUpperCase()
            this.app.data['description'] = $('#description').val()
            this.app.data['imageurl'] = $('#imageURL').val()
        }
    
        return Step2Page;
    });

})();


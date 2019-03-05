var $ = require('jquery');

class Step1Page {

    constructor(app) {
        this.app=app
    }
    
    load() {
        return $.ajax({
                async: true,
                url: "step1.html",
                type: 'GET',
            }).then(function(data){
                $('#root').empty()
                $('#root').append(data)
            })
    }

    init() {
        var self = this
        $('#button1').on('click', function(e) {
            e.preventDefault()
            self.app.forward('step2')
        })
    }
    
}

module.exports = Step1Page


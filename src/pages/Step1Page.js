var $ = require('jquery');

class Step1Page {

    constructor(app) {
        this.app=app
    }
    
    load() {
        return new Promise(function(resolve) {
            $.ajax({
                async: true,
                url: "step1.html",
                type: 'GET',
                success: function(data) {
                    $('#root').empty()
                    $('#root').append(data)
                    resolve()
                }
            });
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


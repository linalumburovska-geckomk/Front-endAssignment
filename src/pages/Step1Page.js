var $ = require('jquery')

class Step1Page {

    constructor(app) {
        this.app=app
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


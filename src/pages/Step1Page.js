var $ = require('jquery')
var Step2Page = require('./Step2Page')

class Step1Page {

    constructor(app) {
        this.app=app
    }

    init() {
        var self = this
        $('#button1').on('click', function(e) {
            e.preventDefault()
            self.app.forward('step2', new Step2Page(self.app))
        })
    }
    
}

module.exports = Step1Page


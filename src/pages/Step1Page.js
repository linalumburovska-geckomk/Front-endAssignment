const $ = require('jquery')
const Step2Page = require('./Step2Page')

class Step1Page {

    constructor(app) {
        this.app=app
    }

    init() {
        let self = this
        $('#button1').on('click',(e) => {
            e.preventDefault()
            self.app.forward('step2', new Step2Page(self.app))
        })
    }
    
}

module.exports = Step1Page


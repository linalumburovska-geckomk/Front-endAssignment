const $ = require('jquery')
const Step4Page = require('./Step4Page')

class Step3Page {

    constructor(app){
        this.app= app
    }

    init() {
        $('#nameFeed').append(sessionStorage.getItem('name',name))
        let self=this
        $("#createLayer").on('click', () => {
            self.app.forward('step4', new Step4Page(self.app))
        })
    }
}

module.exports = Step3Page
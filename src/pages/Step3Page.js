var $ = require('jquery')

class Step3Page {
    constructor(app){
        this.app= app
    }

    init() {
        $('#nameFeed').append(sessionStorage.getItem('name',name))
        var self=this
        $("#createLayer").on('click', function(){
            self.app.forward('step4')
        })
    }
}

module.exports = Step3Page
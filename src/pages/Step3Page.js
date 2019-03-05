var $ = require('jquery')

class Step3Page {
    constructor(app){
        this.app= app
    }

    load() {
        return $.ajax({
            async: true,
            url: "step3.html",
            type: 'GET',
        }).then(function(data){
            $('#root').empty()
            $('#root').append(data)
        })
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
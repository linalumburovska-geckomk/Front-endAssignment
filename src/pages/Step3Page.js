var $ = require('jquery')

class Step3Page {
    constructor(app){
        this.app= app
    }

    load() {
        return new Promise(function(resolve) {
            $.ajax({
                async: true,
                url: "step3.html",
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
        $('#nameFeed').append(sessionStorage.getItem('name',name))
        var self=this
        $("#createLayer").on('click', function(){
            self.app.forward('step4')
        })
    }
}

module.exports = Step3Page
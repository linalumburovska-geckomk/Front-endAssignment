var $=require('jquery')

var layersGlobal
var clicked
var index

var Step5Page = function(app) {
    this.app = app
}

Step5Page.prototype.load = function() {
    return new Promise(function(resolve) {
        $.ajax({
            async: true,
            url: "step5.html",
            type: 'GET',
            success: function(data) {
                $('#root').empty()
                $('#root').append(data)
                resolve()
            }
        });
    })
}

Step5Page.prototype.init = function() {
    index=sessionStorage.getItem('index')
    clicked = sessionStorage.getItem('clicked')
    layersGlobal = JSON.parse(sessionStorage.getItem('layersGlobal'))
    $('#nameFeed').append(sessionStorage.getItem("name"))
    var self=this
    $("#createLayer").on('click', function(){
        self.app.forward('step4')
    })
    

    for(var i=0; i<layersGlobal.length;i++) {
        var layer=layersGlobal[i]
        var buttonEdit="<button class='btn btn-secondary editButton' id='" + i + "' >Edit</button>"
        var appendRow="<tr><td>"+ layer +"</td><td>" + buttonEdit + "</td></tr>"
        $('#tableLayers tbody').append(appendRow)
    }    

    for(var i=0; i<layersGlobal.length;i++) {
        $("#"+i+"").click(function(){
            index= $(this).attr('id')
            sessionStorage.setItem("index",index)
            var add=layersGlobal[index]
            clicked=add   
            sessionStorage.setItem("clicked",clicked)
            self.app.forward('step4Edit')
        })
    }
}



Step5Page.prototype.dispose = function() {

}


module.exports = Step5Page
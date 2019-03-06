const $=require('jquery')
const Step4EditPage = require('./Step4EditPage')

let layersGlobal
let clicked
let index

class Step5Page {

    constructor(app) {
        this.app = app
    }

    init() {
        index=sessionStorage.getItem('index')
        clicked = sessionStorage.getItem('clicked')
        layersGlobal = JSON.parse(sessionStorage.getItem('layersGlobal'))
        $('#nameFeed').append(sessionStorage.getItem("name"))
        let self=this
        $("#createLayer").on('click', () => {
            self.app.forward('step4', self.app.pageMap['step4'])
        })
        
    
        for(let i=0; i<layersGlobal.length;i++) {
            let layer=layersGlobal[i]
            let buttonEdit="<button class='btn btn-secondary editButton' id='" + i + "' >Edit</button>"
            let appendRow="<tr><td>"+ layer +"</td><td>" + buttonEdit + "</td></tr>"
            $('#tableLayers tbody').append(appendRow)
        }    
    
        for(let i=0; i<layersGlobal.length;i++) {
            $("#"+i+"").click(function(){
                index= $(this).attr('id')
                sessionStorage.setItem("index",index)
                var add=layersGlobal[index]
                clicked=add   
                sessionStorage.setItem("clicked",clicked)
                self.app.forward('step4Edit', new Step4EditPage(self.app))
            })
        }
    }
}

module.exports = Step5Page
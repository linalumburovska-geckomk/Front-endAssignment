const { $ } = require('../dom')
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
            let tr = document.createElement("tr")
            let td1 = document.createElement("td")
            let td2 = document.createElement("td")
            td1.innerHTML = layer
            td2.innerHTML = buttonEdit
            tr.appendChild(td1)
            tr.appendChild(td2)
            $('#tableLayers').appendRow(tr)
        }    
    
        for(let i=0; i<layersGlobal.length;i++) {
            $("#"+i+"").on('click',function(){
                index= i
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
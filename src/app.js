window['jQuery'] = require('jquery')

var App = require('./main')
var Step1Page = require('./pages/step1')
var Step2Page = require('./pages/step2')
var Step3Page = require('./pages/step3')
var Step4Page = require('./pages/step4')
var Step5Page = require('./pages/step5')
var Step4EditPage = require('./pages/step4Edit')

var app = new App()
app.addPage('step1', new Step1Page(app))
app.addPage('step2', new Step2Page(app))
app.addPage('step3', new Step3Page(app))
app.addPage('step4', new Step4Page(app))
app.addPage('step5', new Step5Page(app))
app.addPage('step4Edit', new Step4EditPage(app))

var tmpLocation = window.location.href 

if(tmpLocation.indexOf('step')===-1){
    app.forward('step1')
} else {
    var lastFive = tmpLocation.substr(tmpLocation.length - 5)
    if(lastFive[0]==4){
        app.forward('step4Edit')
    } else {
        app.forward(lastFive)
    } 
}

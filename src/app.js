window['jQuery'] = require('jquery')

var App = require('./main')
var Step1Page = require('./pages/Step1Page')
var Step2Page = require('./pages/Step2Page')
var Step3Page = require('./pages/Step3Page')
var Step4Page = require('./pages/Step4Page')
var Step5Page = require('./pages/Step5Page')
var Step4EditPage = require('./pages/Step4EditPage')

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

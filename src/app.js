window['jQuery'] = require('jquery')

var Main = require('./Main')
var Step1Page = require('./pages/Step1Page')

var app = new Main()

var tmpLocation = window.location.href 
if(tmpLocation.indexOf('step')===-1){
    app.forward('step1', new Step1Page(app))
} 

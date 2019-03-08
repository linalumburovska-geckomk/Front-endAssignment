let { $ } = require('./dom')
window['jQuery'] = $
const Main = require('./Main')
const Step1Page = require('./pages/Step1Page')

const app = new Main()

const tmpLocation = window.location.href 
if(tmpLocation.indexOf('step')===-1){
    app.forward('step1', new Step1Page(app))
}
(function(){
    requirejs.config({
        baseUrl: 'js',
        paths: {
            "jquery": "./lib/jquery-3.3.1.min",
            "bootstrap": "./lib/bootstrap/js/bootstrap.min",
            "main": "./main",
            "step1": "./pages/step1",
            "step2": "./pages/step2",
            "step3": "./pages/step3",
            "step4": "./pages/step4",
            "step5": "./pages/step5",
            "step4Edit": "./pages/step4Edit",
            "plugins": "./plugins"
        }
        
    });
    
    require(["main","step1","step2","step3","step4","step5","step4Edit"], function(Application, Step1Page, Step2Page, Step3Page, Step4Page, Step5Page, Step4EditPage) {
        var app = new Application()
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
    });
})();




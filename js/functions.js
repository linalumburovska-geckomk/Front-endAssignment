var clicked ='';
var layersGlobal=[];
var index=-1;

var App = function() {
    this.pageMap = {}
    this.currentPage = null
    this.data = {}
}

App.prototype.addPage = function(url, page) {
    if (this.isPageValid(page)) {
        this.pageMap[url] = page
    }
}

App.prototype.forward = function(url) {
    if (typeof this.pageMap[url] !== 'undefined') {
        if (this.currentPage !== null) {
            this.currentPage.dispose()
        }
        this.currentPage = this.pageMap[url]
        var self = this
        this.currentPage.load().then(function() {
            self.currentPage.init()
        }).catch(function(e) {
            console.error(e)
        })
        // Implement the history api from the browser
    }
}

App.prototype.isPageValid = function(page) {
    var loadState = typeof page['load'] === 'function'
    var initState = typeof page['init'] === 'function'
    var disposeState = typeof page['dispose'] === 'function'
    return loadState && initState && disposeState
}

// ------------------------------------------
var Step1Page = function(app) {
    this.app = app
}

Step1Page.prototype.load = function() {
    return new Promise(function(resolve) {
        $.ajax({
            async: true,
            url: "step1.html",
            type: 'GET',
            success: function(data) {
                $('#root').empty()
                $('#root').append(data)
                resolve()
            }
        });
    })
}

Step1Page.prototype.init = function() {
    var self = this
    $('#button1').on('click', function(e) {
        e.preventDefault()
        self.app.forward('step2')
    })
}


Step1Page.prototype.dispose = function() {
}

// ------------------------------------------

var Step2Page = function(app) {
    this.app = app
}

Step2Page.prototype.load = function() {
    return new Promise(function(resolve) {
        $.ajax({
            async: true,
            url: "step2.html",
            type: 'GET',
            success: function(data) {
                $('#root').empty()
                $('#root').append(data)
                resolve()
            }
        });
    })
}

Step2Page.prototype.init = function() {
    var self = this
    $('#back').on('click', function() {
        self.app.forward('step1')
    })
    $('#save').on('click', function() {
        if(($('#name').val()!='') &&  ($('#description').val()!='') &&  ($('#imageURL').val()!='')){
            self.app.forward('step3')
        } else if($('#name').val() ==""){
            $('#errorName').show()
        } else if($('#description').val()=="") {
            $('#errorName').hide()
            $('#errorDescription').show()
        } else if($('#imageURL').val()==""){
            $('#errorName').hide()
            $('#errorDescription').hide()
            $('#errorImage').show()
        }
    })
}


Step2Page.prototype.dispose = function() {
    this.app.data['name'] = $('#name').val().toUpperCase()
    this.app.data['description'] = $('#description').val()
    this.app.data['imageurl'] = $('#imageURL').val()
}

// ------------------------------------------

var Step3Page = function(app) {
    this.app = app
}

Step3Page.prototype.load = function() {
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

Step3Page.prototype.init = function() {
    $('#nameFeed').append(this.app.data['name'])
    var self=this
    $("#createLayer").on('click', function(){
        self.app.forward('step4')
    })

}

Step3Page.prototype.dispose = function() {
}

// ------------------------------------------
var Step4Page = function(app) {
    this.app = app
}

Step4Page.prototype.load = function() {
    return new Promise(function(resolve) {
        $.ajax({
            async: true,
            url: "step4.html",
            type: 'GET',
            success: function(data) {
                $('#root').empty()
                $('#root').append(data)
                resolve()
            }
        });
    })
}

Step4Page.prototype.init = function() {
    var self=this
    $('#backStep4').on('click', function(){
        self.app.forward('step3')
    })
    $('#saveStep4').on('click', function(){
        var nameStep4=$("#nameStep4").val()
        if(nameStep4!=''){
            layersGlobal.push(nameStep4)
            self.app.forward('step5')
        } else {
            $('#errorName').show()
        }
    })

}

Step4Page.prototype.dispose = function() {

}


//-----------------------------------------

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
    $('#nameFeed').append(this.app.data['name'])
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
            var add=layersGlobal[index]
            clicked=add            
            self.app.forward('step4Edit')
        })
    }

}



Step5Page.prototype.dispose = function() {
    this.app.data['edit']=clicked;
}

// ------------------------------------------
var Step4EditPage = function(app) {
    this.app = app
}

Step4EditPage.prototype.load = function() {
    return new Promise(function(resolve) {
        $.ajax({
            async: true,
            url: "step4Edit.html",
            type: 'GET',
            success: function(data) {
                $('#root').empty()
                $('#root').append(data)
                resolve()
            }
        });
    })
}

Step4EditPage.prototype.init = function() {
    $("#nameEdit").val(this.app.data['edit'])

    var self=this
    $("#backStep4Edit").on('click', function(){
        self.app.forward('step3')        
    })

    $("#saveStep4Edit").on('click', function(){
        var nameStep4=$("#nameEdit").val()
            if(nameStep4!=''){
                layersGlobal[index]=nameStep4
                self.app.forward('step5')
            } else {
                $('#errorName').show()
            }
        
        self.app.forward('step5')
    })

}

Step4EditPage.prototype.dispose = function() {    
}


// ------------------------------------------

$('window').ready(function() {
    var app = new App()
    app.addPage('step1', new Step1Page(app))
    app.addPage('step2', new Step2Page(app))
    app.addPage('step3', new Step3Page(app))
    app.addPage('step4', new Step4Page(app))
    app.addPage('step4Edit', new Step4EditPage(app))
    app.addPage('step5', new Step5Page(app))
    app.forward('step1')
})
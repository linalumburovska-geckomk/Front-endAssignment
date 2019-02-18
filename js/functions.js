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
    console.log(this.app.data['haha'])
    var self = this
    $('#button1').on('click', function(e) {
        e.preventDefault()
        self.app.forward('step2')
    })
}

Step1Page.prototype.dispose = function() {
    console.log('dispose')
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
    console.log('dispose')
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
    $('#nameStep3').append(this.app.data['name'])
    var self=this
    $("#createLayer").on('click', function(){
        self.app.forward('step4')
    })

}

Step3Page.prototype.dispose = function() {
    console.log('dispose')
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
    // $('#nameStep3').append(this.app.data['name'])
    console.log("init")

}

Step4Page.prototype.dispose = function() {
    console.log('dispose')
}


// ------------------------------------------

$('window').ready(function() {
    var app = new App()
    app.addPage('step1', new Step1Page(app))
    app.addPage('step2', new Step2Page(app))
    app.addPage('step3', new Step3Page(app))
    app.addPage('step4', new Step4Page(app))
    app.forward('step1')
})
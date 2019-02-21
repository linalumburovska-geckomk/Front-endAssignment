(function(){

    define(function(require){

        var $=require('jquery')
        require('bootstrap')
    
        layersGlobal=JSON.parse(localStorage.getItem('layersGlobal'))
        clicked=localStorage.getItem('clicked')
        index=localStorage.getItem('index')
    
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
    
    
        return Step5Page;
    });

})();


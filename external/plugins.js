(function($) {
    let createPlugin = (identifier, plugin) => {
        $.fn[identifier] = function() {
            return plugin(this)
        }
    }
    
    createPlugin('sanitize', (element) => {
        var input = element.val()
        if(input!==undefined) {
            var output = input.replace(/<script[^>]*?>.*?<\/script>/gi, '').
            replace(/<[\/\!]*?[^<>]*?>/gi, '').
            replace(/<style[^>]*?>.*?<\/style>/gi, '').
            replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '')
            if(input==output){
                return output
            } else {
                return -1
            }
        } else {
            return ""
        }
    })
})(jQuery)
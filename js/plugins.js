(function($) {
    $.fn.sanitize = function() {
        var input = this.val()
        
        if(input!==undefined) {
            var output = input.replace(/<script[^>]*?>.*?<\/script>/gi, '').
            replace(/<[\/\!]*?[^<>]*?>/gi, '').
            replace(/<style[^>]*?>.*?<\/style>/gi, '').
            replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
            if(input==output){
                return output
            } else {
                return -1
            }
        } else {
            return "";
        }
        
    };
})(jQuery);
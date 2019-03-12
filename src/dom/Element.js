class Element extends Array {

    constructor(elementList) {
        super()
        for (let element of elementList) {
            this.push(element)
        }
    }

    on(event, callback) {
        for (let el of this) {
            el.addEventListener(event, callback)
        }
        return this
    }

    show() {
        for (let el of this){
            el.style.display = "block"
        }
        
        return this
    }

    hide() {
        for (let el of this){
            el.style.display = "none"
        }
        return this
    }

    modal(status) {
        for(let el of this) {
            if(status==='show') {
                el.style.display="block"
            } else {
                el.style.display="none"
            }
        }
       
        
        return this
    }

    val() {
        for(let el of this) {
            return el.value
        }
        return this
    }

    setValue(value){
        for(let el of this) {
            el.setAttribute("value",value)
        }
    }

    attr(id) {
        for(let el of this) {
            el.setAttribute("id", id)
        }
        return this
    }

    // each(callback) {
    //     for (let el of this) {
    //         callback(el)
    //     }
    // }

    empty() {
        for(let el of this){
            while (el.firstChild) {
                el.removeChild(el.firstChild);
            }
        }
        return this
    }

    append(data) {
        for(let el of this) {
            el.innerHTML = data
        }
        return this
    }

    appendRow(child){
        for(let el of this) {
            el.appendChild(child)
        }
        return this
    }

    sanitize() {
        var input = this.val()
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
    }

    isVisible() {
        for(let el of this) {
            if(el ===null || el.style.display ==="none") {
                return false
            } else {
                return true
            }
        }
        return this
    }
}

module.exports = Element
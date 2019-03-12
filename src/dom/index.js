// import Element from './Element'

let Element = require('./Element')

let getByID = (selector) => {
    let id = selector.slice(1, selector.length)
    let elements = [document.getElementById(id)]
    return new Element(elements)
}

let getByClass = (selector) => {
    let className = selector.slice(1, selector.length)
    let elements = document.getElementsByClassName(className)
    return new Element(elements)
}

let $ = (selector) => {
    
    if (selector[0]==="#") { 
        return getByID(selector)
    } else if (selector[0]==='.') { 
        return getByClass(selector)
    }
}

let ajax = ({ url, type , data, headers, json = false }) => {
    let out = {
        status : null,
        statusText: null,
        data: null
    }
    return fetch(url, {
        method: type,
        headers,
        body: typeof data !== 'undefined' ? JSON.stringify(data) : undefined }
    ).then((response) => {
        out.status = response.status
        out.statusText = response.statusText
        if (json) {
            return response.json()   
        } else {
            return response.text()
        }
    }).then((data) => {
        out.data = data
        return out
    }).catch((response) => {
        throw response
    })
}

module.exports = {
    $:$,
    ajax:ajax
}
// export { $, ajax }
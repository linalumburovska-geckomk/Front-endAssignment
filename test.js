var assert = require('assert')

//My functions
const valueExists = (layers, name) => {
    for(let i=0; i<layers.length;i++){
        if(layers[i]===name) {
            return true;
        }
    }
    return false;
}

//Testing
describe('ValueExists', () => {
    it('checks if the value exists in an array', () => {
        assert.equal(valueExists(['Layer1','Layer2','Layer3'],'Layer1'), true)
        assert.equal(valueExists(['Layer1','Layer2','Layer3'],'Layer4'), false)
        assert.equal(valueExists(['Layer1','Layer2','Layer3'],'layer1'), false)
        assert.equal(valueExists(['Layer1','Layer2','Layer3'],'Layer2'), true)
    })
})
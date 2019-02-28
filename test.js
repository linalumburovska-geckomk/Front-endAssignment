var assert = require('assert')

//My functions
function valueExists(layers, name) {
    for(var i=0; i<layers.length;i++){
        if(layers[i]===name) {
            return true;
        }
    }
    return false;
}

//Testing
describe('ValueExists', function(){
    it('checks if the value exists in an array', function(){
        assert.equal(valueExists(['Layer1','Layer2','Layer3'],'Layer1'), true)
        assert.equal(valueExists(['Layer1','Layer2','Layer3'],'Layer4'), false)
        assert.equal(valueExists(['Layer1','Layer2','Layer3'],'layer1'), false)
        assert.equal(valueExists(['Layer1','Layer2','Layer3'],'Layer2'), true)
    })
})
const { JSDOM } = require('jsdom')
const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom
const $ = global.jQuery = require('jquery')(window)
const assert = require('assert')
const expect = require('chai').expect
const chai = require('chai')
const sinon=require('sinon')

let Main = require('../src/Main')
let main = new Main()
let Step1Page = require('../src/pages/Step1Page')
let Step2Page = require('../src/pages/Step2Page')
let Step3Page = require('../src/pages/Step3Page')
let Step4Page = require('../src/pages/Step4Page')
let Step5Page = require('../src/pages/Step5Page')
let Step4EditPage = require('../src/pages/Step4EditPage')

let step1 = new Step1Page(main)
let step2 = new Step2Page(main)
let step3 = new Step3Page(main)
let step4 = new Step4Page(main)
let step5 = new Step5Page(main)
let step4Edit = new Step4EditPage(main)

// ---------------------
//Page1
//Test1
describe('Class Step1Page-constructor', () => {
    it('checks its constructor', () => {
        assert.equal(typeof step1.app, 'object')
        expect(step1.app).equal(main)
    })
})

describe('Class Step1Page- button', () => {
    it('checks if button does the right forward', () => {
        var e = {
            preventDefault: sinon.spy()
        }
        $("#button1").on('click',e)
        assert.equal(e.preventDefault.called, false)
    })
})


// ---------------------
//Page2
//Test2
describe('Class Step2Page-constructor', () => {
    it('checks its constructor', () => {
        assert.equal(typeof step2.app, 'object')
        expect(step2.app).equal(main)
    })
})

//Test3
describe('Class Step2Page- alerts', () => {
    it('checks if alerts are visible', () => {
        chai.assert.equal($("#errorName").is(":visible"), false)
        chai.assert.equal($("#sanitizeName").is(":visible"), false)
        chai.assert.equal($("#errorDescription").is(":visible"), false)
        chai.assert.equal($("#sanitizeDescription").is(":visible"), false)
        chai.assert.equal($("#errorImage").is(":visible"), false)
        chai.assert.equal($("#sanitizeImage").is(":visible"), false)
    })
})

// ---------------------
//Page3
//Test4
describe('Class Step3Page-constructor', () => {
    it('checks its constructor', () => {
        assert.equal(typeof step3.app, 'object')
        expect(step3.app).equal(main)
    })
})

//Test5
describe('Class Step3Page-value', () => {
    it('checks if feed value is not empty', () => {
        expect($("#nameFeed")).to.not.equal("")
    })
})

// ---------------------
//Page4
//Test6
describe('Class Step4Page-constructor', () => {
    it('checks its constructor', () => {
        assert.equal(typeof step4.app, 'object')
        expect(step4.app).equal(main)
    })
})

//Test7
describe('Class Step4Page-modal', () => {
    it('checks if modal save is visible', () => {
        chai.assert.equal($('#modalSaveLayer').is(":visible"), false)
    })
})

//Test8
describe('Class Step4Page-value', () => {
    it('checks if name step4 value is not empty', () => {
        expect($("#nameStep4")).to.not.equal("")
    })
})

// ---------------------
//Page5
//Test9
describe('Class Step5Page-constructor', () => {
    it('checks its constructor', () => {
        assert.equal(typeof step5.app, 'object')
        expect(step5.app).equal(main)
    })
})

// ---------------------
//Page4Edit
//Test10
describe('Class Step4EditPage-constructor', () => {
    it('checks its constructor', () => {
        assert.equal(typeof step4Edit.app, 'object')
        expect(step4Edit.app).equal(main)
    })
})

//Test11
describe('Class Step4EditPage-modal', () => {
    it('checks if modal edit is visible', () => {
        chai.assert.equal($('#modalEditLayer').is(":visible"), false)
    })
})

//Test12
describe('Class Step4EditPage-value', () => {
    it('checks if name edit value is not empty', () => {
        expect($("#nameEdit")).to.not.equal("")
    })
})
const { JSDOM } = require('jsdom')
const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom
const $ = global.jQuery = require('jquery')(window)
const assert = require('assert')
const expect = require('chai').expect

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
//Testing main class
//Test 1
describe('Class main - Page validation function', () => {
    it('checks if all pages are valid',() => {
          assert.equal(main.isPageValid(step1), true)
          assert.equal(main.isPageValid(step2), true)
          assert.equal(main.isPageValid(step3), true)
          assert.equal(main.isPageValid(step4), true)
          assert.equal(main.isPageValid(step5), true)
          assert.equal(main.isPageValid(step4Edit), true)
    });
  });
  
  
//Test2 
describe('Class main-constructor', () => {
    it('checks main constructor', () => {
        assert.equal(typeof main.pageMap, 'object')
        expect(main.currentPage).to.be.null
        assert.equal(typeof main.data, 'object')
    })
})


//Test3
describe('CLass main - adding pages in forward', () => {
    it('checks if pages are not undefined so they can be added to pageMap', () => {
        main.pageMap['step1'] = step1
        expect(main.pageMap['step1']).to.not.equal(undefined)
        main.pageMap['step2'] = step2
        expect(main.pageMap['step2']).to.not.equal(undefined)
        main.pageMap['step3'] = step3
        expect(main.pageMap['step3']).to.not.equal(undefined)
        main.pageMap['step4'] = step4
        expect(main.pageMap['step4']).to.not.equal(undefined)
        main.pageMap['step5'] = step5
        expect(main.pageMap['step5']).to.not.equal(undefined)
        main.pageMap['step4Edit'] = step4Edit
        expect(main.pageMap['step4Edit']).to.not.equal(undefined)
    })
})

//Test4
describe('Test session storage', () => {
    it('checks at the beginning if values in sessionStorage are empty', () => {
        assert.equal(sessionStorage.getItem('index'), -1)
        assert.equal(sessionStorage.getItem('clicked'), '')
        assert.equal(sessionStorage.getItem('layersGlobal'), '[]')
    })
})


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


global.jdistsUtil = require('../')
      

describe("src/jdists-util.ts", function () {
  var assert = require('should');
  var util = require('util');
  var examplejs_printLines;
  function examplejs_print() {
    examplejs_printLines.push(util.format.apply(util, arguments));
  }
  
  

  it("isYes():base", function () {
    examplejs_printLines = [];
  examplejs_print(jdistsUtil.isYes('Yes'))
  assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  examplejs_print(jdistsUtil.isYes('True'))
  assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  examplejs_print(jdistsUtil.isYes('Ok'))
  assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  examplejs_print(jdistsUtil.isYes('On'))
  assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  examplejs_print(jdistsUtil.isYes('Onn'))
  assert.equal(examplejs_printLines.join("\n"), "false"); examplejs_printLines = [];
  });
          
  it("isNo():base", function () {
    examplejs_printLines = [];
  examplejs_print(jdistsUtil.isNo('False'))
  assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  examplejs_print(jdistsUtil.isNo('No'))
  assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  examplejs_print(jdistsUtil.isNo('Off'))
  assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  examplejs_print(jdistsUtil.isNo('of'))
  assert.equal(examplejs_printLines.join("\n"), "false"); examplejs_printLines = [];
  });
          
});
         
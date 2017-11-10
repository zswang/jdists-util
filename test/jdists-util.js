
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
          
  it("buildProcessor():module.exports", function () {
    examplejs_printLines = [];
  var processor = jdistsUtil.buildProcessor(`
    const path = require('path')
    module.exports = function (content) {
      return path.join('root', content.replace(/\\d/g, '#'))
    }
  `)
  examplejs_print(processor('abc123def456'))
  assert.equal(examplejs_printLines.join("\n"), "root/abc###def###"); examplejs_printLines = [];
  });
          
  it("buildProcessor():content", function () {
    examplejs_printLines = [];
  var processor = jdistsUtil.buildProcessor(`
    const path = require('path')
    return path.join('root', content.replace(/\\d/g, '#'))
  `)
  examplejs_print(processor('abc123def456'))
  assert.equal(examplejs_printLines.join("\n"), "root/abc###def###"); examplejs_printLines = [];
  });
          
  it("buildProcessor():function", function () {
    examplejs_printLines = [];
  var processor = jdistsUtil.buildProcessor(`
  function (content) {
    const path = require('path')
    return path.join('root', content.replace(/\\d/g, '#'))
  }
  `)
  examplejs_print(processor('abc123def456'))
  assert.equal(examplejs_printLines.join("\n"), "root/abc###def###"); examplejs_printLines = [];
  });
          
});
         
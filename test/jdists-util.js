
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
          
  it("buildFunction():module.exports", function () {
    examplejs_printLines = [];
  var fn = jdistsUtil.buildFunction(`
    const path = require('path')
    module.exports = function (content) {
      return path.join('root', content.replace(/\\d/g, '#'))
    }
  `)
  examplejs_print(fn('abc123def456'))
  assert.equal(examplejs_printLines.join("\n"), "root/abc###def###"); examplejs_printLines = [];
  });
          
  it("buildFunction():params is \"content\"", function () {
    examplejs_printLines = [];
  var fn = jdistsUtil.buildFunction(`
    const path = require('path')
    return path.join('root', content.replace(/\\d/g, '#'))
  `, `content`)
  examplejs_print(fn('abc123def456'))
  assert.equal(examplejs_printLines.join("\n"), "root/abc###def###"); examplejs_printLines = [];
  });
          
  it("buildFunction():params is undefined", function () {
    examplejs_printLines = [];
  var fn = jdistsUtil.buildFunction(`
    const path = require('path')
    return path.join('root', 'abc')
  `)
  examplejs_print(fn())
  assert.equal(examplejs_printLines.join("\n"), "root/abc"); examplejs_printLines = [];
  });
          
  it("buildFunction():body is function", function () {
    examplejs_printLines = [];
  var fn = jdistsUtil.buildFunction(function (item) {
    const path = require('path')
    return path.join('root', item)
  })
  examplejs_print(fn('abc'))
  assert.equal(examplejs_printLines.join("\n"), "root/abc"); examplejs_printLines = [];
  });
          
  it("buildFunction():function", function () {
    examplejs_printLines = [];
  var fn = jdistsUtil.buildFunction(`
  function (content) {
    const path = require('path')
    return path.join('root', content.replace(/\\d/g, '#'))
  }
  `)
  examplejs_print(fn('abc123def456'))
  assert.equal(examplejs_printLines.join("\n"), "root/abc###def###"); examplejs_printLines = [];
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
         
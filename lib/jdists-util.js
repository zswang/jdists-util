"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file jdists-util scope
 *
 * Utilities for jdists processors
 * @author
 *   zswang (http://weibo.com/zswang)
 * @version 0.1.1
 * @date 2017-11-15
 */
var ast = require("cbml-ast");
exports.ast = ast;
/**
 * 判断表达式是否为真
 *
 * @param text 表达式
 * @return 如果表达式为真返回 true
 * @example isYes():base
  ```js
  console.log(jdistsUtil.isYes('Yes'))
  // > true
  console.log(jdistsUtil.isYes('True'))
  // > true
  console.log(jdistsUtil.isYes('Ok'))
  // > true
  console.log(jdistsUtil.isYes('On'))
  // > true
  console.log(jdistsUtil.isYes('Onn'))
  // > false
  ```
 */
function isYes(text) {
    return /^(true|on|yes|ok)$/i.test(text);
}
exports.isYes = isYes;
/**
 * 判断表达式是否为假
 *
 * @param text 表达式
 * @return 如果表达式为假返回 true
 * @example isNo():base
  ```js
  console.log(jdistsUtil.isNo('False'))
  // > true
  console.log(jdistsUtil.isNo('No'))
  // > true
  console.log(jdistsUtil.isNo('Off'))
  // > true
  console.log(jdistsUtil.isNo('of'))
  // > false
  ```
 */
function isNo(text) {
    return /^(false|off|no)$/i.test(text);
}
exports.isNo = isNo;
/**
 * 通过代码获取函数
 *
 * @param body 函数代码
 * @return 返回函数
 * @example buildFunction():module.exports
  ```js
  var fn = jdistsUtil.buildFunction(`
    const path = require('path')
    module.exports = function (content) {
      return path.join('root', content.replace(/\\d/g, '#'))
    }
  `)
  console.log(fn('abc123def456'))
  // > root/abc###def###
  ```
 * @example buildFunction():params is "content"
  ```js
  var fn = jdistsUtil.buildFunction(`
    const path = require('path')
    return path.join('root', content.replace(/\\d/g, '#'))
  `, `content`)
  console.log(fn('abc123def456'))
  // > root/abc###def###
  ```
 * @example buildFunction():params is undefined
  ```js
  var fn = jdistsUtil.buildFunction(`
    const path = require('path')
    return path.join('root', 'abc')
  `)
  console.log(fn())
  // > root/abc
  ```
 * @example buildFunction():body is function
  ```js
  var fn = jdistsUtil.buildFunction(function (item) {
    const path = require('path')
    return path.join('root', item)
  })
  console.log(fn('abc'))
  // > root/abc
  ```
 * @example buildFunction():function
  ```js
  var fn = jdistsUtil.buildFunction(`
  function (content) {
    const path = require('path')
    return path.join('root', content.replace(/\\d/g, '#'))
  }
  `)
  console.log(fn('abc123def456'))
  // > root/abc###def###
  ```
 */
function buildFunction(body, defaultParams) {
    if (typeof body === 'function') {
        return body;
    }
    if (/\bmodule\.exports\s*=/.test(body)) {
        var module_1 = {
            exports: {}
        };
        new Function('require', 'module', 'exports', body)(require, module_1, module_1.exports);
        return module_1.exports;
    }
    // 兼容
    if (!(/\bfunction\b/.test(body))) {
        body = "function (" + (defaultParams || '') + ") {\n      " + body + "\n    }";
    }
    // 纯函数
    return new Function('require', "return (" + body + ")")(require);
}
exports.buildFunction = buildFunction;
/**
 * 通过代码获取处理器
 *
 * @param body 处理器代码
 * @return 返回处理器函数
 * @example buildProcessor():module.exports
  ```js
  var processor = jdistsUtil.buildProcessor(`
    const path = require('path')
    module.exports = function (content) {
      return path.join('root', content.replace(/\\d/g, '#'))
    }
  `)
  console.log(processor('abc123def456'))
  // > root/abc###def###
  ```
 * @example buildProcessor():content
  ```js
  var processor = jdistsUtil.buildProcessor(`
    const path = require('path')
    return path.join('root', content.replace(/\\d/g, '#'))
  `)
  console.log(processor('abc123def456'))
  // > root/abc###def###
  ```
 * @example buildProcessor():function
  ```js
  var processor = jdistsUtil.buildProcessor(`
  function (content) {
    const path = require('path')
    return path.join('root', content.replace(/\\d/g, '#'))
  }
  `)
  console.log(processor('abc123def456'))
  // > root/abc###def###
  ```
 */
function buildProcessor(body) {
    return buildFunction(body, 'content, attrs, scope, node');
}
exports.buildProcessor = buildProcessor;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file jdists-util scope
 *
 * Utilities for jdists processors
 * @author
 *   zswang (http://weibo.com/zswang)
 * @version 0.0.14
 * @date 2017-11-10
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
    if (/\bmodule\.exports\s*=/.test(body)) {
        var module_1 = {
            exports: {}
        };
        new Function('require', 'module', 'exports', body)(require, module_1, module_1.exports);
        return module_1.exports;
    }
    // 兼容
    if (!(/\bfunction\b/.test(body)) && /\bcontent\b/.test(body)) {
        body = "function (content) { " + body + " }";
    }
    // 纯函数
    return new Function('require', "return (" + body + ")")(require);
}
exports.buildProcessor = buildProcessor;

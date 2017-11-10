"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file jdists-util scope
 *
 * Utilities for jdists processors
 * @author
 *   zswang (http://weibo.com/zswang)
 * @version 0.0.8
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

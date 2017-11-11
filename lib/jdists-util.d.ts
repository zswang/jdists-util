/**
 * @file jdists-util scope
 *
 * Utilities for jdists processors
 * @author
 *   zswang (http://weibo.com/zswang)
 * @version 0.1.0
 * @date 2017-11-11
 */
import * as ast from 'cbml-ast';
export { ast };
/**
 * 属性集合
 */
export interface IAttrs {
    [name: string]: string;
}
/**
 * 代码块处理器
 *
 * @param content 代码块内容
 * @param attrs= 该节点属性
 * @param scope= 该节点作用域
 * @param node= 节点
 * @return 返回处理后的字符串或者处理过程
 */
export interface IProcessor {
    (content: string, attrs?: IAttrs, scope?: IScope, node?: ast.Node): string | Promise<string>;
}
/**
 * 功能扩展
 *
 * @param target 扩展对象
 */
export interface IExtender {
    (target: object): any;
}
/**
 * jdists 作用域
 */
export interface IScope {
    /**
     * 执行数据导入
     *
     * @param importation 导入项表达式 : "#variant" 内存, "@argv" 属性, "filename[?selector]" 文件和代码块
     * @return 返回导入的内容
     */
    execImport: {
        (importation: string): string;
    };
    /**
     * 执行数据导出
     *
     * @param exportation 导出项表达式 : "#variant" 内存, "filename" 文件
     * @return 返回导出是否成功
     */
    execExport: {
        (exportation: string, content: string | any): boolean;
    };
    /**
     * 执行触发器
     *
     * @param trigger 触发器表达式
     * @return 返回触发器是否生效
     */
    execTrigger: {
        (trigger: string): boolean;
    };
    /**
     * 编译完整内容，一般用于模板引擎二次处理 jdists
     *
     * @param content 可能包含 jdists 代码块的内容
     * @return 返回编译的结果
     */
    compile: {
        (content: string): string;
    };
    /**
     * 获取命令行参数
     *
     * @param name 参数名
     * @return 返回该参数值
     */
    getArgument: {
        (name: string): string;
    };
    /**
     * 获取环境变量
     *
     * @param name 变量名
     * @return 返回该变量值
     */
    getEnvironment: {
        (name: string): string;
    };
    /**
     * 获取内存变量
     *
     * @param name 变量名
     * @return 返回该变量值
     */
    getVariant: {
        (name: string): any;
    };
    /**
     * 设置内存变量
     *
     * @param name 变量名
     */
    setVariant: {
        (name: string, value: any);
    };
    /**
     * 获取当前文件所在目录
     *
     * @return 返回当前文件所在目录
     */
    getDirname: {
        (): string;
    };
    /**
     * 获取当前文件名，相对工作目录
     *
     * @return 返回当前文件所在目录
     */
    getFilename: {
        (): string;
    };
}
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
export declare function isYes(text: string): boolean;
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
export declare function isNo(text: string): boolean;
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
export declare function buildFunction(body: string | Function, defaultParams?: string): Function;
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
export declare function buildProcessor(body: string | Function): IProcessor;

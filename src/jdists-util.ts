import * as ast from 'cbml-ast'

export {
  ast
}

/**
 * 代码块处理器
 *
 * @param content 代码块内容
 * @param attributes= 该节点属性
 * @param scope= 该节点作用域
 * @param node= 节点
 * @return 返回处理后的字符串或者处理过程
 */
export interface IProcessor {
  (content: string, attributes?: ast.Attributes, scope?: IScope, node?: ast.Node): string | Promise<string>
}

/**
 * jdists 作用域
 */
export interface IScope {

  execImport: {
    (importation: string): string
  }

  execExport: {
    (exportation: string, content: string | any): boolean
  }

  execTrigger: {
    (trigger: string): boolean
  }

  compile: {
    (content: string): string
  }

  /**
   * 获取命令行参数
   *
   * @param name 参数名
   * @return 返回该参数值
   */
  getArgument: {
    (name: string): string
  }

  /**
   * 获取环境变量
   *
   * @param name 变量名
   * @return 返回该变量值
   */
  getEnvironment: {
    (name: string): string
  }

  /**
   * 获取内存变量
   *
   * @param name 变量名
   * @return 返回该变量值
   */
  getVariant: {
    (name: string): any
  }

  /**
   * 设置内存变量
   *
   * @param name 变量名
   */
  setVariant: {
    (name: string, value: any)
  }
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
export function isYes(text: string): boolean {
  return /^(true|on|yes|ok)$/i.test(text)
}

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
export function isNo(text: string): boolean {
  return /^(false|off|no)$/i.test(text)
}
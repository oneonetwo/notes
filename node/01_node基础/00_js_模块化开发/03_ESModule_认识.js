/**
 *  1. 在我们的html中，使用了module模块化的代码，那么必须开启一个服务来打开
 *      1. <script src='./foo.js'/> 是没有作用域的
 *      2. <script scr='./foo.js' type="module"/> 有作用域
 *  2. export 和 import 结合使用
 *  3. 导入函数 import(),  单独的import导入声明只能在模块的顶层
 *      3.1 不允许在逻辑代码中写import
 *          - ES Module在被js引擎解析时，就必须知道它的依赖关系
 *          - 这个时候js代码没有运行，所以没办法获取js逻辑中的import
 *
 *      3.2 使用import函数，可以在代码逻辑中使用, 动态加载 返回的是 promise
 *      
 *  4. import meta import.meta是一个给javaScript模块暴露特定上下文元数据属性的对象
 *      4.1 它包含了這個模塊的信息，比如這個模塊的URL
 *      4.2 在ES11(ES2020)中新增的特性
 */

const name  = 'jingyuan'

//1. 导入
// 1.1 导出方式1
export {
    name
}
// 1.2 导出方式2
export {
    name as fname
}
// 1.3. 当初方式3
export const age = 123

//2. 导出
// 2.1. 导入方式1
import { name, age } from './foo.js'
// 2.2. 导入方式1
import { name as ss } from './foo.js'
// 2.3. 导入方式1
import * as data from './foo.js'


// 3. export 和 import 结合使用  创建一个index.js 作为统一的输出口
    // 3.1. 优化一 
    export {formatCount, formatDate}  from './format.js'
    // 3.2 优化二
    export * from './format.js' 

// 4. default的用法 默认导出
// 4.1 在一個模塊中，只能有一个默认导出（default export）

// 5. import（）函数
const importPromise = import('./foo.js')
importPromise.then(res=>{
    let { name, age } = res
})
/**********************************************************************
1. 以下是 Node.js 模块系统的简化实现，展示了 module.exports 和 exports 的关系：
/*
*/
function Module(id){
    this.id = id
    this.exports = {}
}
Module.prototype.load = function(){
    const module = this
    const exports = module.exports 

    //模拟模块代码执行环境
    (function(exports, require, module, __filename, __dirname){
        //这里的代码就是模块的内容
        exports.a = 1
        exports.b = 2

        //如果这里改成module.exports = function(){}， 将覆盖原来的module.exports 对象
    })(exports, require, module, __filename, __dirname)
}

// 模拟require函数 创建模块实例，加载模块，并返回 module.exports 的值。
function require(id){
    const module = new Module(id)
    module.load()
    return module.exports
}

// //测试 
const myModule = require('./myModule')
console.log(myModule)
/**
*
**********************************************************************
* 2. 以下是完整的简化版的实现
*
* 模块的解析与路径处理（_resolveFilename）
* 模块的缓存管理（_cache）
* 模块的加载与编译（load, _extensions, _compile）
* JavaScript 代码的隔离与执行（vm.runInThisContext）
* 模块的导出与导入（exports, require）*
*/
const path = require('path')
const fs = require('fs')
const vm = require('vm')

function Module(id, parent){
    this.id = id
    this.exports = {}
    this.parent = parent
    this.filename = null
    this.loaded = false
    this.children = []
}
Module._cache = {} //缓存已加载的模块
Module._extensions = {} //文件扩展名与处理函数的映射
Module._resolveFilename = function(request){
    // 简化解析文件名 相对路径解析为绝对路径
    return path.resolve(__dirname, request)
}
Module.prototype.load = function(filename){
    this.filename = filename
    // 获取后缀
    const extension = path.extname(filename) 
    //不同的后缀使用不同的处理函数
    Module._extensions[extension](this, filename)
    this.loaded = true
}
Module._extensions['.js'] = function(module, filename){
    const content = fs.readFileSync(filename, 'uft8')
    module._compile(content, filename)
}
Module.prototype._compile = function(content, filename){
    const wrapper = Module.wrap(content)
    // vm.runInThisContext 方法的作用是将字符串形式的 JavaScript 代码编译并在当前上下文中运行，类似于 eval，但具有更好的安全性和隔离性。它允许我们指定一个独立的上下文（即一个隔离的执行环境），并在其中运行代码。
    const compiledWrapper = vm.runInThisContext(wrapper, { filename }) // filename显示脚本文件名

    const exports = this.exports
    const require = this.require.bind(this)
    const __filename = filename
    const __dirname = path.dirname(filename)

    compiledWrapper.call(exports, exports, require, this, __filename, __dirname)

}

Module.wrap = function(content){
    return `(function(exports, require, module, __filename, __dirname){ ${content} \n});`
}

Module.prototype.require = function require(file){
    const filename = Module._resolveFilename(file)
    if(Module._cache[filename]){
        return Module._cache[filename].exports
    }
    const module = new Module(filename, null)
    Module._cache[filename] = module
    module.load(filename)
    return module.exports
}

//測試代碼
const myModule = require('./myModule.js');
console.log(myModule);


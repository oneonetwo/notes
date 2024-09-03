
/*
*
**********************************************************************
//2. 以下是完整的简化版的实现
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
    // 简化解析文件名 相对路径解析为绝对路径 它还会自动处理并去除路径中的 . 和 ..，并移除重复的斜杠
    // 如果在处理过程中遇到一个绝对路径（例如，以 / 开头的路径），则前面的路径片段会被忽略。
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
    const content = fs.readFileSync(filename, { 
        encoding: 'utf8'
    })
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
const moduleInstance = new Module();
const myModule = moduleInstance.require('./myModule.js');
console.log(myModule.multiply(2, 3));


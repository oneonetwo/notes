
/**
 * commom.js的应用
 */
(function (modules: any) {
    //webpack启动函数
    //模块的缓存
    var installedModeules: Record<string, any> = {};
    function __webpack_require__(moduleId: any) { 
        //检查一个新的模块并且放在模块的缓存中
        if (installedModeules[moduleId]) { 
            return installedModeules[moduleId];
        }
        //创建一个新的模块斌且放在模块的缓存中
        var module = installedModeules[moduleId] = {
            i: moduleId,
            l: false,
            expors: {}
        }
        //执行模块函数
        modules[moduleId].call(modules.exports, module, module.expors, __webpack_require__);
        //模块设置已经加载
        module.l = true;

    }
})({
    './src/index.js': function (module: any, exports: any) { 
    }
})
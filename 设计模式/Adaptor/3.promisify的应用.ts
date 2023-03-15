/*
 * @Descripttion: 把一些异步的函数转化为promise输出 
 * @version: 
 * @Author: D
 * @Date: 2023-02-23 19:42:52
 * @LastEditors: jy
 * @LastEditTime: 2023-03-15 10:16:12
 */

export {};
let fs = require('fs');
function promisify(callbackFn){
    return function(...args){
        return new Promise((resolve, reject)=>{
            callbackFn(...args, function(err, data){
                if(err) reject(err); 
                else resolve(data);
            })
        })
    }
}

let readFile = promisify(fs.readFile);
(async function () {
    let content = await readFile('./1.txt', 'utf8');
    console.log(content);
})();
/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-02-22 19:18:59
 * @LastEditors: jy
 * @LastEditTime: 2023-02-22 19:39:18
 */

function foo(name){
    this.name = name;
}
foo.prototype.hello = function(){
    console.log('hello wrold', this.name);
}
function createInstance(constructor){
    let instance;
    return function(){
        if(!instance){
            constructor.apply(this, arguments);
            //指定对象的原型对象
            Object.setPrototypeOf(this, constructor.prototype);
            return instance = this;
        }else {
            return instance;
        }
    }
}

let w1 = createInstance(foo);
let s = new w1('景园');
console.log(s);
/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-02-22 19:18:59
 * @LastEditors: yjy
 * @LastEditTime: 2023-02-23 07:25:31
 */

/**
 * 单例-封装变化
 * 
 */

export { }
interface Foo { }
function Foo(this: any, name: string) {
    this.name = name;
}
Foo.prototype.hello = function () {
    console.log('hello' + this.name);
}
//希望封装变化 可以创建任何沟槽函数的实例
// const { apply: (arg0: Foo, arg1: IArguments) => void; prototype: object | null; }
let createInstance = function (Constructor: any) {
    let instance: Foo;
    return function (this: any) {
        if (!instance) {
            Constructor.apply(this, arguments);
            //给this指定原型
            Object.setPrototypeOf(this, Constructor.prototype);
            instance = this;
        }
        return instance;
    }
}

let createFoo = createInstance(Foo);
let f1 = new (createFoo as any)('jingyuan');
let f2 = new (createFoo as any)('jingyuan');
console.log(f1);
console.log(f1.hello());
console.log(f1 === f2);

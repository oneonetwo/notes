/**
 * 透明单例
 * 客户端和使用者这并不需要知道要按照单例使用
 */

export { };

interface Foo {
    name: any; 

}
let Foo = (function () { 
    let instance: Foo;
    return function (this: Foo, name: any) { 
        this.name = name;
        if (!instance) { 
            instance = this;
        } 
        return instance;
    }
})()
let f1 = new (Foo as any)('jingyuan');
let f2 = new (Foo as any)('jingyuan');
console.log(f1);
console.log(f1 === f2);
/**
 * 单例与构建过程分离
 * 单例与创建的类分离
 */

export { }
interface Foo{ }
function Foo(this: any, name: string) { 
    this.name = name;
}
Foo.prototype.hello = function () { 
    console.log('hello' + this.name);
}

let getInstance = (function () { 
    let instance: Foo;
    return function (name: string) { 
        if (!instance) { 
            instance = new Foo(name);
        }
        return instance;
    }
})()

let f1 = getInstance('景源');
let f2 = getInstance('景源');
console.log(f1);
console.log(f1===f2);

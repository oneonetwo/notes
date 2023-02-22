//es5实现的单例模式

function Foo(this: any, name) { 
    this.name = name;
}
Foo.prototype.hello = function () { }

Foo.getInstance = (function () {
    let instance;
    return function (name) { 
        if (!instance) {
            instance = new Foo(name);
        } 
        return instance;
    }
})()

let f1 = Foo.getInstance('jingyuan');
let f2 = Foo.getInstance('huoweiwie');
console.log(f1 === f2);
console.log(f2);


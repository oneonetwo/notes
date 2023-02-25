/**
 *装饰器分成普通装饰器和装饰器工厂两种 
 */
//如果说装饰器函数是用来修饰类的话，那么target是类的构造函数本身
//1. 普通装饰器
// function flyable(target) {
//     console.log(target);
//     target.prototype.swings = 2;
//     target.prototype.fly = function () { 
//         console.log('我能飞');
//     }
// }
//2. 装饰器工厂
function flyable(numbers) { 
    return function (target) { 
        console.log(target);
        target.prototype.swings = numbers;
        target.prototype.fly = function () {
            console.log('我能飞')
        }
    }
}
interface Animal { 
    swings: number;
    fly: Function;
}
@flyable;
class Animal { 
    constructor() { }
}
let animal: Animal = new Animal();
console.log(animal.swings);
animal.fly();

namespace b { 
    //类的实例属性接受参数target key; target是原型
    function instancePropertyDecorator(target, key) { 
        target.protoName = '我是类的原型上的属性'
        console.log('instance')
    }
    //类的静态属性接受的是target key target是构造函数
    function classPropertyDecorator(target, key ) { 
        console.log('classProperDecorator', target, key);
    }
    //类的实例方法接受是target是原型 key方法名， descriptor属性描述符
    function instanceMethodDecorator(target, key, descriptor) { 
        console.log('instanceMethodDecorator', target, key, descriptor);
    }
    //类的实例方法接受是target是构造函数 key方法名， descriptor属性描述符
    function classMethodDecorator(target, key, descriptor) { 
        console.log('classMethodDecorator', target, key, descriptor);
    }
    interface Person { 
        protoName: string;
    }
    class Person { 
        @instancePropertyDecorator;
        instanceProperty: string;//实例属性
        @classPropertyDecorator;
        static classProperty: string; //类的静态属性
        @instanceMethodDecorator;
        instanceMethod() { }//实例的方法
        @classMethodDecorator;
        static classMethod() { }//类的静态方法
    }
}
//实现两个常用的装饰器 readonly 
namespace d{ 
    function readonly(target, key) { 
        Object.defineProperty(target, key, {
            writable: false,
        })
    }
    function deprecate(target, key, descriptor) { 
        let oldFun = descriptor.value;
        descriptor.value = function (...args) { 
            console.log(`${target.constructor.name}类的${key}方法很快就会被放弃`);
            return oldFun(...args);
        }
        Object.defineProperty(target, key, {
            value: function () { 
                console.log('这个方法以后可能会放弃');
                return oldFun.apply(target, arguments);

            }
        })
    }
    class Circle { 
        @readonly;
        pi: number = 3.12
        @deprecate;
        getName() { 
            console.log('getName');
        }
    }
    let c = new Circle();
    console.log(c.pi);
}
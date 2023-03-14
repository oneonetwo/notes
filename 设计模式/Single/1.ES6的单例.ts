/*
 * @Description: ES6实现单例
 * @Author: yjy
 * @Date: 2023-02-22 21:53:16
 * @LastEditTime: 2023-02-22 21:58:05
 * @LastEditors: yjy
 * @Reference: 
 */
export { }

class Foo { 
    private static  instance: Foo;
    private constructor() { }
    static getInstance() { 
        if (Foo.instance) {
            return Foo.instance;
        } else { 
            return Foo.instance = new Foo();
        }
    }
}

let w1 = Foo.getInstance();
let w2 = Foo.getInstance();
console.log(w1 === w2)
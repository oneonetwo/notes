/*
 * @Description:
 * @Author: yjy
 * @Date: 2023-03-07 21:22:06
 * @LastEditTime: 2023-03-17 10:41:04
 * @LastEditors: jy
 * @Reference: 
 */
abstract class A {
    bridge: B;
    constructor(bridge) {
        this.bridge = bridge;
    }
    go() {
        console.log(`从${this.from()}到${this.bridge.to()}`);
    }
    abstract from() :void;
}
class A1 extends A {
    from() {
        return 'A1';
    }
}
class A2 extends A {
    from() {
        return 'A2';
    }
}

class B {
    to() {}
}
class B1 extends B {
    to() {
        return 'B1';
    }
}
class B2 extends B {
    to() {
        return 'B2';
    }
}
let b = new B3();
let a = new A2(b);
a.go();
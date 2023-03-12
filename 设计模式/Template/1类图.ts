/*
 * @Description: 
 * @Author: yjy
 * @Date: 2023-03-12 23:18:46
 * @LastEditTime: 2023-03-12 23:24:19
 * @LastEditors: yjy
 * @Reference: 
 */

export { }
abstract class Person { 
    dinner() {
        this.buy();
        this.cook();
        this.eat();
    }
    abstract buy(): void;
    abstract cook(): void;
    abstract eat(): void;
}
class Huoweiwei extends Person {
    buy(): void {
        console.log("Method not implemented.");
    }
    cook(): void {
        console.log("Method not implemented.");
    }
    eat(): void {
        console.log("Method not implemented.");
    } 
}

let weiwei = new Huoweiwei();
weiwei.dinner()
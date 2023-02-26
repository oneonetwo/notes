
/**
 * 1. target 目标对象，也就是被代理的对象，是具体业务的执行者
 * 2. Proxy代理对象，里面包含一个目标对象的引用，可以实现对访问的扩展和额外的处理。
 */
export { }
abstract class Star { 
    abstract answerPhone(): void;
    availale: boolean //有没有空
}

// interface Star { }也一样
class AngelaBaby extends Star {
    availale= true;
    answerPhone(): void {
        console.log('你好，我是baby')
    } 
}

class AngelaBabyAgent extends Star {
    angelaBaby: AngelaBaby;
    constructor() { 
        super();
        this.angelaBaby = new AngelaBaby();
    }
    //让经纪人保持一个对angelababy的引用
    answerPhone(): void {
        console.log('你好我是经纪人');
        if (this.angelaBaby.availale) {
            this.angelaBaby.answerPhone();    
        } else { 
            console.log('不好意思，我们都太忙了')
        }
    }
}

let angelaBabyAgent = new AngelaBabyAgent();
angelaBabyAgent.answerPhone();
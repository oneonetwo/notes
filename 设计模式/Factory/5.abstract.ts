/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-02-22 15:50:44
 * @LastEditors: jy
 * @LastEditTime: 2023-03-14 18:58:26
 */
export {};
//抽象工厂
//三种抽象类型
abstract class AmericanCoffee{}
abstract class LatteCoffee{}
abstract class CappuccinoCoffee{}
//六中具体的实现
class StarBuckAmericanCoffee extends AmericanCoffee{}
class StarBuckLatteCoffee extends AmericanCoffee{}
class StarBuckCappuccinoCoffee extends CappuccinoCoffee{}
class LuckinAmericanCoffee extends AmericanCoffee{}
class LuckinLatteCoffee extends AmericanCoffee{}
class LuckinCappuccinoCoffee extends CappuccinoCoffee{}

//抽象工厂 抽象工厂需要创建三种类别的coffee  依赖具体的coffee创建
abstract class CafeFactory{
    abstract createAmericanoCoffee(): AmericanCoffee;
    abstract createLatteCoffee(): LatteCoffee;
    abstract createCappuccinoCoffee(): CappuccinoCoffee;
}
class StarBuckFactory extends CafeFactory{
    createAmericanoCoffee(): AmericanCoffee {
        return new StarBuckAmericanCoffee();
    }
    createLatteCoffee(): LatteCoffee {
        return new StarBuckLatteCoffee();
    }
    createCappuccinoCoffee(): CappuccinoCoffee {
        return new StarBuckCappuccinoCoffee();
    }
    
}
class LuckinFactory extends CafeFactory{
    createAmericanoCoffee(): AmericanCoffee {
        return new LuckinAmericanCoffee();
    }
    createLatteCoffee(): LatteCoffee {
        return new LuckinLatteCoffee();
    }
    createCappuccinoCoffee(): CappuccinoCoffee {
        return new LuckinCappuccinoCoffee();
    }
}


let starbucker = new StarBuckFactory();
console.log(starbucker.createAmericanoCoffee());

let luckiner = new LuckinFactory();
console.log(luckiner.createLatteCoffee());

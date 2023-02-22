/*
 * @Descripttion:  在工厂方法模式中，核心的工厂类不再负责所有的产品的创建，而是将具体创建的工作交给子类去做
 * @version: 
 * @Author: D
 * @Date: 2023-02-22 14:23:59
 * @LastEditors: jy
 * @LastEditTime: 2023-02-22 15:17:34
 */
namespace B{
    abstract class Coffee {
        constructor(public name: string) {}
    }
    class AmericanCoffee extends Coffee {}
    class LatteCoffee extends Coffee {}
    class CappuccinoCoffee extends Coffee {}
    class NormalCoffee extends Coffee {}
    
    
    //工厂方法
    abstract class CoffeeFactory{
        abstract createCoffee(): Coffee;
    }
    class AmericanCoffeeFactory extends CoffeeFactory{
        createCoffee(): AmericanCoffee{
            return new AmericanCoffee("美式咖啡");
        }
     }
    class LatteCoffeFactory extends CoffeeFactory{ 
        createCoffee(): LatteCoffee {
            return new LatteCoffee('拿铁咖啡');
        }
    } 
    class CappuccinoCoffeeFactory extends CoffeeFactory{
        createCoffee(): CappuccinoCoffee {
            return new CappuccinoCoffee('卡布奇诺');        
        }
    }
    
    class CateFactory {
        static order(name?: string) {
            switch (name) {
                case "American":
                    return new AmericanCoffeeFactory().createCoffee();
                case 'Latte':
                    return new LatteCoffeFactory().createCoffee();
                case 'Cappuccino':
                    return new CappuccinoCoffeeFactory().createCoffee();
                default:
                    throw new Error('错了。');
            }
        }
    }
    
    CateFactory.order('American')
}

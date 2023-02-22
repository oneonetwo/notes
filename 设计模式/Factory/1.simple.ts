namespace A{


abstract class Coffee {
	constructor(public name: string) {}
}
class AmericanCoffee extends Coffee {}
class LatteCoffee extends Coffee {}
class CappuccinoCoffee extends Coffee {}
class NormalCoffee extends Coffee {}

class CoffeeFactory {
	static order(name?: string) {
		switch (name) {
			case "American":
				return new AmericanCoffee("美式咖啡");
			case 'Latte':
			    return new LatteCoffee('拿铁咖啡');
			case 'Cappuccino':
			    return new CappuccinoCoffee('卡布奇诺');
			default:
			    return new NormalCoffee('柠檬水');
		}
	}
}
console.log(CoffeeFactory.order("American"));
console.log(CoffeeFactory.order("Latte"));
console.log(CoffeeFactory.order("Cappuccino"));
console.log(CoffeeFactory.order());
}
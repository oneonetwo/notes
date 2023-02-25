/*
 * @Description: 装饰器模式
 * @Author: yjy
 * @Date: 2023-02-25 15:08:53
 * @LastEditTime: 2023-02-25 16:09:08
 * @LastEditors: yjy
 * @Reference: 
 */
abstract class Shape {
    abstract draw(): void;
 };
class Circle extends Shape { 
    draw() {
        console.log('画个圆')
    }
}
class Rectangle extends Shape {
    draw() {
        console.log('换个矩形')
    } 
}
//装饰器模式
abstract class ColorfulShape extends Shape{
    constructor(public shape: Shape) { 
        super();
    }
    abstract draw(): void;
}
class RedColorfulShape extends ColorfulShape { 
    draw(): void {
        this.shape.draw();
        console.log('把边框涂成绿色')
    }
}
class GreenColorfulShape extends ColorfulShape {
    draw(): void {
        this.shape.draw();
        console.log('把边框涂成黄色');
    } 
}

let redColorfulShape = new RedColorfulShape(new Circle());
redColorfulShape.draw();

let greenColorfulShape = new GreenColorfulShape(new Rectangle());
greenColorfulShape.draw();


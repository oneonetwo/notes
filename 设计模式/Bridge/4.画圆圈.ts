/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-03-17 10:51:29
 * @LastEditors: jy
 * @LastEditTime: 2023-03-17 11:40:03
 */
export {}


// 接口
interface DrawAPI{
    drawCircle(x: any, y: any, radius: any, ctx: any): void
}
class RedCircle implements DrawAPI{
    drawCircle(x: number,y: number,radius: number, ctx): void {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
    }
}
class GreenCircle implements DrawAPI{
    drawCircle(x: number,y: number,radius: number, ctx): void {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI);
        ctx.fillStyle = 'green';
        ctx.fill();
    }
}


//实现抽象类
abstract class Shape{
    protected drawAPI: DrawAPI;
    protected ctx: any;
    protected shape(drawAPI: DrawAPI): void{
        this.drawAPI = drawAPI;
    }
    public abstract  draw(): void;
}
class Circle extends Shape{
    private x:number;
    private y: number;
    private radius: number;
    constructor(x, y, radius, drawAPI, canvas){
        super();
        this.x = x;  
        this.y = y;  
        this.radius = radius;
        this.drawAPI = drawAPI;
        this.ctx = canvas.getContext('2d');
        
    }
    public draw(): void {
        this.drawAPI.drawCircle(this.x, this.y, this.radius, this.ctx);
    }
   
}

class BridgeDemo{
    constructor(){
     let circle = new Circle(30, 30, 30, new GreenCircle(),  document.getElementById('canvas'))
     circle.draw();
    }
}
/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-03-13 17:17:19
 * @LastEditors: jy
 * @LastEditTime: 2023-03-13 19:04:38
 */
export {}
class Person{
    protected name: string = 'jingyuan';
    private age: number = 30;
    getName(){
        console.log(this.name);
    }
    getAge(){
        console.log(this.age);
    }
}
class Teacher extends Person{
    constructor(){
        super()
    }
}
let xiaoming = new Teacher();
console.log(xiaoming);
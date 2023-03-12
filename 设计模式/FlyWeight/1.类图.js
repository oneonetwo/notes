/*
 * @Description: 
 * @Author: yjy
 * @Date: 2023-03-12 22:55:22
 * @LastEditTime: 2023-03-12 23:09:41
 * @LastEditors: yjy
 * @Reference: 
 */
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.getAge = function () {
    console.log(this.age)
}
Person.prototype.getName = function () {
    console.log(this.name)
}
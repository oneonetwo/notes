/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-03-01 17:01:43
 * @LastEditors: jy
 * @LastEditTime: 2023-03-01 17:06:20
 */
export {}
let gen = function *(){
    yield 1;
    yield * [2,3]
    yield 4
}

let it = gen();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-03-01 16:42:17
 * @LastEditors: jy
 * @LastEditTime: 2023-03-01 17:03:33
 */
(Array as any).prototype[Symbol.iterator] = function(){
    let arr = this;
    let index = 0;
    return {
        next: ()=>{
            let done = index>arr.length;
            let value =  arr[index++];
            return {value, done};
        }
    }
}

let arr2: any = [1, 2, 3];
/* arr2[Symbol.iterator] = function () {
    let index = 0;
    return {
        next: () => {
            return index < this.length ? { value: this[index++], done: false } : { value: undefined, done: true };
        }
    }
} */
let it2 = arr2[Symbol.iterator]();
console.log(it2.next());
console.log(it2.next());
console.log(it2.next());
console.log(it2.next());
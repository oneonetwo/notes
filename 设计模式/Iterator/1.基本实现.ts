/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-02-28 17:39:15
 * @LastEditors: jy
 * @LastEditTime: 2023-02-28 17:43:17
 */
function createIterator(array){
    let index=0;
    return {
        next(){
            let done = index>=array.length;
            let value = array[index++];
            return {
                value,
                done,
            }
        }
    }
}
let it = createIterator([1,2]);
console.log(it.next());
console.log(it.next());
console.log(it.next());
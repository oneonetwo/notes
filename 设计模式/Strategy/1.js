/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-03-02 13:47:41
 * @LastEditors: jy
 * @LastEditTime: 2023-03-02 14:09:09
 */
// class Customer{
//     constructor(kind) {
//         this.kind=kind;
//     }
//     cost(amount) {
//         return this.kind.discount(amount);
//     }
// }
// class Kind{

// }
// class Normal extends Kind{
//     discount(amount) {
//         return amount;
//     }
// }
// class Member extends Kind{
//     discount(amount) {
//         return amount*.9;
//     }
// }
// class VIP extends Kind{
//     discount(amount) {
//         return amount*.8;
//     }
// }
// let c1=new Customer(new Normal());
// console.log(c1.cost(100));
// c1.kind=new Member();
// console.log(c1.cost(100));
// c1.kind=new VIP();
// console.log(c1.cost(100));


//把算法封装在策略对象中，指定算法调用即可
class Customer{
    constructor(){
        this.kinds = {
            'normal': (amount)=>{
                return amount;
            },
            'member': (amount)=>{
                return amount * 0.7;
            },
            'vip': (amount) =>{
                return amount * 0.3;
            }
        }
    }
    cost (kind, amount){
        return this.kinds[kind](amount);
    }
}
let c=new Customer();
console.log(c.cost('normal',100));
console.log(c.cost('member',100));
console.log(c.cost('vip',100));
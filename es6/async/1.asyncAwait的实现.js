/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-03-20 12:54:18
 * @LastEditors: jy
 * @LastEditTime: 2023-03-20 14:06:35
 */
function executor(a=0){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(100+a);
        }, 1000)
    });
}
function * gen(){
    let a = yield executor();   
    let b = yield executor(a);
    return b;
}

function co(iterator){
    return new Promise((resolve, reject)=>{
        function next(val){
            let {value, done} = iterator.next(val);
            if(done) resolve(done);
            Promise.resolve(value).then(data=>{
                next(data);
            }, reject)
        }
        next();
    })
}

let g = gen();
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
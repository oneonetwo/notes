/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-03-22 11:08:57
 * @LastEditors: jy
 * @LastEditTime: 2023-03-22 13:52:23
 */
const compose = function(...funs){
    return funs.reduce((a, b)=>{
        return (...args) => a(b(...args));
    })
}

export default compose;
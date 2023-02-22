/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-02-22 14:52:34
 * @LastEditors: jy
 * @LastEditTime: 2023-02-22 14:56:27
 */
function createElement(type:any, config: any){
    return {
        type,
        props: config
    }
}
function createFactory(type: any){
    const factory = createElement.bind(null, type);
    return factory;
}
let factory = createFactory('h1');
console.log(factory({id: 'h1', className:'title'}));
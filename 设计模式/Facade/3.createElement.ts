/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-03-01 11:57:59
 * @LastEditors: jy
 * @LastEditTime: 2023-03-01 13:06:22
 */
//props.children可能是一个对象，也可能是一个数组。
function createElement(type, config, children){
    let props:any = {};
    let childrenLength = arguments.length - 2;
    if(childrenLength==1){
        props.children = children;
    }else if(childrenLength>1){
        let childrenArray = new Array(childrenLength);
        for(let i =0; i<childrenLength;i++){
            childrenArray[i] = arguments[i + 1];
        }
        props.children = childrenArray;
    }else{
        props.children = null;
    }
    
}
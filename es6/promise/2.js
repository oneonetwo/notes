/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-03-20 11:09:21
 * @LastEditors: jy
 * @LastEditTime: 2023-03-20 11:14:02
 */
let fs = require('fs');

let readFile = new Promise((resolve, reject)=>{
    fs.readFile('./test.txt', 'utf8', function(err, data){
        resolve(data);
    })
})
readFile.then(data=>{
    return data+1;
})

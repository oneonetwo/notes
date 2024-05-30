// 文件读取的三种方式
const fs = require('fs');
// 1. 同步讀取
const res1 = fs.readFileSync('./abc.txt', {
    encoding: 'utf8'
});

// 2. 异步读取，回调函数
fs.readFile('./abc.txt', {encoding: 'utf-8'}, (err, data)=>{
    // console.log(data)
})

//3. 异步读取 Promise
fs.promises.readFile('./abc.txt', {
    encoding: 'utf-8'
}).then(data=>{
    console.log('promises', data)
}).catch(err=>{
    console.log(err)
})
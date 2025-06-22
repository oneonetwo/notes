
/************************************************************************
 * 1 文件读取的三种方式
 */
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

/************************************************************************
 * 2 文件描述符
 */
//1.打开一个文件，拿到文件描述符，获取文件信息
fs.open('./abc.txt', (err, fd)=>{
    if(err) {
        console.log('文件打开失败')
        return
    }
    // 1. fd 為文件描述符
    // 2.读取文件信息
    fs.fstat(fd, (err, stat)=>{
        if(err) return
        console.log(stat)
        // 3. 需要手动关闭 文件
        fs.close(fd)
    })
})
/************************************************************************
 * 3.文件写入
 */
const fs = require('fs')
const content = "hello world, my name is coderwhy"
fs.writeFile('./ccc.txt', content, {econding:'utf8', flag: 'w+'}, err=>{
    // options - 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ， flag 为 'w'
    if(err)
        console.log('文件写入错误', err)
    else 
        console.log('写入成功')
}) 


// Flag	描述
// r	以只读模式打开文件。文件必须存在。如果文件不存在，会抛出异常
// r+	以读写模式打开文件。文件必须存在。
// rs	以同步方式只读打开文件。阻塞操作，但在某些操作系统上可能会提供更好的稳定性。
// rs+	以同步方式读写打开文件。阻塞操作，但在某些操作系统上可能会提供更好的稳定性。
// w	以只写模式打开文件。如果文件不存在则创建文件，如果文件存在则截断文件。
// wx	类似于 'w'，但如果路径存在，则失败。
// w+	以读写模式打开文件。如果文件不存在则创建文件，如果文件存在则截断文件。
// wx+	类似于 'w+'，但如果路径存在，则失败。
// a	以追加模式打开文件。如果文件不存在则创建文件。
// ax	类似于 'a'，但如果路径存在，则失败。
// a+	以读取和追加模式打开文件。如果文件不存在则创建文件。
// ax+	类似于 'a+'，但如果路径存在，则失败。


/************************************************************************
 * 4 文件夹操作
*/
// fs.mkdir(path[, options,], callback);
// path - 文件路径。

// options 参数可以是：

// recursive - 是否以递归的方式创建目录，默认为 false。
// mode - 设置目录权限，默认为 0777。
// callback - 回调函数，没有参数。
var fs = require("fs");
// tmp 目录必须存在
fs.mkdir("/tmp/test/",function(err){
   if (err) {
       return console.error(err);
   }
   console.log("目录创建成功。");
});
// 以上代码执行结果如下：
// 可以添加 recursive: true 参数，不管创建的目录 /tmp 和 /tmp/a 是否存在：

fs.readDir('./why', {withFileTypes: true}, (err, files)=>{ })
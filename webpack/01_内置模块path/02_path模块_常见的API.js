/** 
 * 1.  从路径中获取信息
 *    > dirname:获取文件的父文件夹;
 *    > basename:获取文件名;
 *    > extname:获取文件扩展名
 * 
 * 2. 路径的拼接:path.join
 *    1. 如果我们希望将多个路径进行拼接,但是不同的操作系统可能使用的是不同的分隔符;
 *    2. 这个时候我们可以使用path.join函数;
 * 
 * 3. 拼接绝对路径:path.resolve
 *    1. path.resolve()方法会把一个路径或路径片段的序列解析为一个绝对路径;
 *    2. 给定的路径的序列是从右往左被处理的,后面每个path被依次解析,直到构造完成一个绝对路径;
 *    3. 如果在处理完所有给定path的段之后,还没有生成绝对路径,则使用当前工作目录;
 *    4. 生成的路径被规范化并删除尾部斜杠,零长度path段被忽略;
 *    5. 如果没有path传递段,path.resolve()将返回当前工作目录的绝对对路径
 *     
 * 
*/


const path = require('path')

const filepath = "c:\\a\\b\\c.txt"

// 1. 常见api
console.log(path.extname(filepath))  //.txt
console.log(path.basename(filepath))  // c.txt
console.log(path.dirname(filepath))  //c:\a\b


// 2. 路径拼接
const path1 = '/abc/cba'
const path2 = '../why/kobe/jame.txt'
console.log(path.join(path1, path2)) //\abc\why\kobe\jame.txt


const path3 = './abc/cba'
const path4 = '../why/kobe/jame.txt'
// 3. 将多个路径拼接在一起，最终一定返回一个绝对路径
console.log(path.resolve(path3, path4)) //E:\LEARN_2024\notes\webpack\01_内置模块path\abc\why\kobe\jame.txt
console.log(path.resolve('/a/b/c', '../d/e/f', '444/1.txt')) //E:\a\b\d\e\f\444\1.txt


//webpack中的使用
const resolve = dir => path.resolve(__dirname, dir)
// alias: {
//     "@": resolve("src")    
// }
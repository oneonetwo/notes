/*
 * @Descripttion: 把一段jsx代码编译成浏览器可执行的js代码
 * @version: 
 * @Author: D
 * @Date: 2023-02-16 19:20:31
 * @LastEditors: jy
 * @LastEditTime: 2023-02-20 11:42:03
 */
const parser = require('./parse'); //生成AST;
// const  traverse = require('./traverse'); //遍历AST;
const transformer = require('./transformer'); //转化AST; 
const codeGenerator = require('./codeGenerator');//生成代码

let sourceCode = '<h1 id="title"><span>hello</span>world</h1>';
let AST = parser(sourceCode);
transformer(AST)
console.log(JSON.stringify(AST, null , 2));
let code = codeGenerator(AST);
console.log(code);


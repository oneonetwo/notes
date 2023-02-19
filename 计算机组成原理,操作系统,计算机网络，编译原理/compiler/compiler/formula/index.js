/**
 * 拿到抽象语法树之后要计算结果
 */
let parse = require('./parse');
let evaluate = require('./evaluate');
let sourceCode = '2+3*4+5*7+1';
let AST = parse(sourceCode);

console.log('evaluate', evaluate(AST));
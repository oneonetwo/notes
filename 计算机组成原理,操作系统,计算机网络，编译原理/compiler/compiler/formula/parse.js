
let tokenize = require('./tokenize');
let toAST = require('./toAST');
/**
 * 可以把一段代码转成抽象语法树
 */
function parse(script){
    let tokenReader = tokenize(script);
    // console.log(JSON.stringify(tokenReader, null, 2));
    let ast = toAST(tokenReader);
    return ast;
}


module.exports = parse;
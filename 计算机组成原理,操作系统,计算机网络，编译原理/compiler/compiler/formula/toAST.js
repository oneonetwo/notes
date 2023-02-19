/**
 * 语法分析，进行tokens的推导生成ast;
 * 开始推导 加法 ，乘法， 先推到优先级低的加法 再去乘法
 * 实现的时候， 每一个规则都是一个函数  additive=>对应加法规则   muptiplicative对应乘法规则
 * 规则：  add =>  multiple | multiple + add
 *         multiple => NUMBER | NUMBER * multiple
 * 示例 2 + 3 * 4
 * ASTNode 
 * @param {*} tokenReader 
 */
const ASTNode = require('./ASTNode');
const nodeTypes = require('./nodeTypes');
const tokenTypes = require('./tokenTypes');

function toAST(tokenReader){
    let rootNode = new ASTNode(nodeTypes.Program);
    let child = additive(tokenReader);
    rootNode.appendChild(child);
    return rootNode;
}
//把每个token转换成AST语法树的节点
function additive(tokenReader){
    let child = multiple(tokenReader);
    let node = child;
    let token = tokenReader.peek();//看下一个符号是不是加号
    if(child!=null && token!=null){
        if(token.type == tokenTypes.PLUS){ //如果是加号，则配对第一条规则的第二列
            token = tokenReader.read();//消耗掉 + 
            let otherChild = additive(tokenReader);
            if(otherChild != null){
                node = new ASTNode(nodeTypes.Additive);
                node.appendChild(child);
                node.appendChild(otherChild);
            }
        }
    }
    return node;
};
function multiple(tokenReader){
    let child = number(tokenReader);
    let node = child;
    let token = tokenReader.peek(); // * 
    if(token != null && child != null){
        if(token.type == tokenTypes.MULTIPLY){ //如果后面是乘法
            token = tokenReader.read();
            let otherChild = multiple(tokenReader);
            if(otherChild!=null){
                node = new ASTNode(nodeTypes.Multiplicative);
                node.appendChild(child);
                node.appendChild(otherChild);
            }
        }
    }
    return node;
};
function number(tokenReader){
    let node = null;
    let token = tokenReader.peek();
    if(token && token.type === tokenTypes.NUMBER){
        token = tokenReader.read(); //消耗掉token
        node = new ASTNode(nodeTypes.Numeric, token.value);
    }
    return node;
};
module.exports = toAST;
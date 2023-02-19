/*
 * @Descripttion: 语法分析，根据tokens生成AST 
 * @version: 
 * @Author: D
 * @Date: 2023-02-17 18:00:51
 * @LastEditors: yjy
 * @LastEditTime: 2023-02-18 22:05:45
 * 
 */
/**
 * 参考的文法结构：
 * jsxElement => <JSXIndentifier attribute* >child</JSXIndentifier>
 * attribute => AttributeKey = "AttrbuteStringValue"
 * child => JSXElement | JSXText
 */


const tokenTypes = require('./tokenTypes');
const nodeTypes = require('./nodeTypes');
const tokenizer = require('./tokenizer');

let pos = 0;
let tokens = null;

function genJSXElement(){
    let element = {
        type: nodeTypes.JSXElement,
        openingElement: null,
        closingElement: null,
        children: null,
    }
    let token = tokens[pos];
    let {type} = token;
    //生成开始element
    if(type == tokenTypes.LeftParentheses){
        pos++; //消耗掉 <
        element.openingElement = genOpeningElement();
        if(tokens[pos].type == tokenTypes.RightParentheses){
            pos++; //消耗掉 >;
        }
    }
    //生成孩子元素
    element.children = genChildren();
    //生成结束的closeElement
    token = tokens[pos++];
    nextToken = tokens[pos++];
    if (token.type == tokenTypes.LeftParentheses && nextToken.type == tokenTypes.Backslash) { 
        element.closingElement = genClosingElement();
         if (tokens[pos].type == tokenTypes.RightParentheses) {
             pos++; //消耗掉 >;
         }
    }
    return element;
}
function genChildren(){
    let children = [];
    genChild();
    return children;
    function genChild() {
        let token = tokens[pos];
        let nextToken = tokens[pos + 1];
        let child = null;
        if (token.type == tokenTypes.LeftParentheses && nextToken.type != tokenTypes.Backslash) {
            child = genJSXElement();
        } else if (token.type == tokenTypes.JSXText) {
            child = genText();
        }
        if (child) {
            children.push(child);
            genChild();
        }
    }
}
function genText() {
    let token = tokens[pos++];
    return {
        type: nodeTypes.JSXText,
        value: token.value
    }

} 
//生成开始标签
function genOpeningElement(){
    let element = {
        type: nodeTypes.JSXOpeningElement,
        name: genJSXIndentifier(), //消耗 token
        attributes: genAttribute()
    }
    return element;
}
function genClosingElement() { 
    return {
        type: nodeTypes.JSXClosingElement,
        name: genJSXIndentifier(), //消耗 token
    }
}
//生成标签的tag
function genJSXIndentifier(){
    let token = tokens[pos++];//消耗
    return {
        type: nodeTypes.JSXIdentifier,
        name: token.value
    }
}
// //生成属性的value
function genLiteral(){
    let token = tokens[pos++];//消耗
    return {
        type: nodeTypes.Literal,
        value: token.value
    }
}
// //生成属性
function genAttribute(){
    let attributes = [];
    let token = tokens[pos];
    while(token.type == tokenTypes.AttributeKey){
        let nextToken = tokens[pos+1];
        let attribute = {
            type: nodeTypes.JSXAttribute,
            name: genJSXIndentifier()
        }
        if(nextToken.type == tokenTypes.AttributeStringValue){
            attribute.value = genLiteral();
        }
        attributes.push(attribute);
        token = tokens[pos];
    }
    return attributes;
}

function parser(sourceCode){
    tokens = tokenizer(sourceCode);
    let AST = {
        type: nodeTypes.Program,
        body: [
            {
                type: nodeTypes.ExpressionStatement,
                expression: genJSXElement()
            }
        ]
    };
    return AST;
}

module.exports = parser;

// let sourceCode = '<h1 id="title" class="foo"><span>hello</span>world</h1>'
// let sourceCode = '<h1 id="title"><span>hello</span>world</h1>';

// console.log(JSON.stringify(parser(sourceCode), null, 2))



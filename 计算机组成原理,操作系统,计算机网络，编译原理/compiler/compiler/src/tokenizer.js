/**
 * 词法分析 把当前输入的字符串转化成 tokens数组
 */
const tokenTypes = require('./tokenTypes');

//判断是否是英文单词或者数字
let LETTER = /[0-9a-z]/;
let tokens = [];
let currentToken = null;
function emit(token){
    tokens.push(token);
    currentToken = {type: '', value: ''};
}
function start(char){
    if(char == '<'){
        emit({ type: tokenTypes.LeftParentheses,  value: char});
        return foundLeftParenttheses;
    }
    throw new Error('第一个字符必须是<')
}
function foundLeftParenttheses(char){
    if(LETTER.test(char)){
        currentToken.type = tokenTypes.JSXIdentifier;
        currentToken.value += char;
        return genIdentifier;
    }else if(char == '/'){
        emit({type: tokenTypes.Backslash, value: '/'});
        return foundLeftParenttheses;
    }
}
function genIdentifier(char){
    if(LETTER.test(char)){
        currentToken.value += char;
        return genIdentifier;
    }else if(char === ' '){
        //结束
        emit(currentToken);
        return attribute;
    }else if(char=='>'){
        emit(currentToken);
        emit({type: tokenTypes.RightParentheses, value: char});
        return foundRightParenttheses;
    }
}
function attribute(char){
    if(LETTER.test(char)){
        currentToken.value += char;
        currentToken.type = tokenTypes.AttributeKey;
        return genAttributeKey;
    }
    throw new Error('error')
}
function genAttributeKey(char){
    if(LETTER.test(char)){
        currentToken.value += char;
        return genAttributeKey;
    }else if(char == '='){
        emit(currentToken);
        return attributeValue;
    }
    throw new Error('error')
}
function attributeValue(char){
    if(/['"]/.test(char)){
        currentToken.type = tokenTypes.AttributeStringValue;
        return genAttributeValueString;
    }
    throw new Error('error')
}
function genAttributeValueString(char){
    if(LETTER.test(char)){
        currentToken.value += char;
        return genAttributeValueString;
    }else if(/['"]/.test(char)){
        emit(currentToken);
        return leaveAttribute;
    }
}
function leaveAttribute(char){
    if(char==' '){
        return attribute;
    }else if(char=='>'){
        emit({type: tokenTypes.RightParentheses, value: char});
        return foundRightParenttheses;
    }
    throw new Error('error');
}
function foundRightParenttheses(char){
    if(char=='<') { //新的标签
        return start(char);
    }else{//开启文本
        currentToken.value += char;
        currentToken.type = tokenTypes.JSXText;
        return genJSXText;
    }
}

function genJSXText(char){
    if(char == '<'){//文本结束
        emit(currentToken);
        return start(char);
    }else{//继续查找文本
        currentToken.value += char;
        return genJSXText;
    }
}

// function end(char){
//     let token = genToken(tokenTypes.RightParentheses, char);
//     emit(token);
//     return start
// }

// function genText(char){
//     if(char && WORD.test(char)){
//         currentToken.value += char;
//         currentToken.type = tokenTypes.JSXText;
//         return genText;
//     }else {//结束
//         emit(currentToken);
//         return start(char);
//     }
// }

// function genIndentifier(char){
//     if(char && WORD.test(char)){
//         currentToken.value += char;
//         currentToken.type = tokenTypes.JSXIdentifier;
//         return genIndentifier;
//     }else if(char == '>'){
//         emit(currentToken);
//         return end(char);
//     }else if(char == '/'){
//         return genAttributeKey(char);
//     }else{
//         emit(currentToken);
//         return genAttributeKey;
//     }
// }
// function genAttributeKey(char){
//     if(char && WORD.test(char)){
//         currentToken.type = tokenTypes.AttributeKey;
//         currentToken.value += char;
//         return genAttributeKey;
//     }else if(char == '='){ //如果是 = 则去收集值
//         emit(currentToken);
//         return genAttributeValue;
//     }else if (char == ' '){ //如果是空格则 继续收集属性的key
//         emit(currentToken);
//         return genAttributeKey;
//     }else if(char == '>'){
//         return end(char);
//     }else{
//         return start(char)
//     }
// }
// function genAttributeValue(char) {
//     if(/['"]/.test(char) && currentToken.value==''){ //开始
//         currentToken.type = tokenTypes.AttributeStringValue;
//         return genAttributeValue;
//     }else if(/['"]/.test(char) && currentToken.value){ //结束
//         emit(currentToken);
//         return genAttributeKey;
//     }else{
//         currentToken.value += char;
//         return genAttributeValue;
//     }
// }

function tokenizer(inputs){
    let handle = start;
    for(let char of inputs){
        handle =  handle(char);
    }
    return tokens;
}


module.exports = tokenizer;



// let sourceCode = '<h1 id="title"><span>hello</span>world</h1>'
// console.log(JSON.stringify(tokenizer(sourceCode), null , 2))
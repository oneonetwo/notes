/**
 *  作用：词法分析（分词），把一段代码分成多个tokens; 
 *  方法：1. tokenizer 有限状态机。分解并想成tokens
 *        2. TokenReader 帮助读取tokens
 */

const tokenTypes = require('./tokenTypes');
let  tokenTypesNames = [null, tokenTypes.NUMBER, tokenTypes.PLUS, tokenTypes.MULTIPLY];
let RegExpObject = /(\d+)|(\+)|(\*)/g;

function * tokenize(inputs){
    while(true){
        let result = RegExpObject.exec(inputs);
        if(!result) break;
        let typeIndex = result.findIndex((item, i)=>(i>0 && item));
        let token = {type: tokenTypesNames[typeIndex], value: result[0]};
        yield token;
    }
} 

function tokenizer(inputs){
    let tokens = [];
    for(let token of tokenize(inputs)){
        tokens.push(token);
    }
    return new TokenReader(tokens);
}

class TokenReader {
    constructor(tokens){
        this.tokens = tokens; //tokens数组
        this.pos = 0; //当前的索引
    }
    //读取当前的token，读完之后消耗掉tokens
    read(){
        if(this.pos<this.tokens.length){
            return this.tokens[this.pos++]
        }
        return null;
    }   
    //获取当前的token不消耗
    peek(){
        if(this.pos<this.tokens.length){
            return this.tokens[this.pos];
        }
        return null;
    }
    //恢复倒退
    unread(){
        if(this.pos>0){
            this.pos--;
        }
    }

}

module.exports = tokenizer;



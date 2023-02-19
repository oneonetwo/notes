/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-02-16 16:48:49
 * @LastEditors: jy
 * @LastEditTime: 2023-02-16 17:12:25
 */
const nodeTypes = require('./nodeTypes');
function evaluate(ast){
    return calc(ast);
    function calc(ast){
        let result = 0;
        let {type, children, value} = ast;
        switch(type){
            case nodeTypes.Numeric:
                result = parseFloat(value);
                break;
            case nodeTypes.Additive:
                result = calc(children[0]) + calc(children[1]);
                break;
            case nodeTypes.Multiplicative:
                result = calc(children[0]) * calc(children[1]);
                break;
            default: //program
                for(let child of children){
                    result = calc(child);
                }
                break;
        }
        return result;
    }
}

module.exports = evaluate;
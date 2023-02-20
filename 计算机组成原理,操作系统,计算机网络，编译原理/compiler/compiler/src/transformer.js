/*
 * @Description: 
 * @Author: yjy
 * @Date: 2023-02-19 00:21:07
 * @LastEditTime: 2023-02-20 08:17:57
 * @LastEditors: yjy
 * @Reference: 
 */
/**
 *转化器：把ast转换成js代码 
 */
const nodeTypes = require('./nodeTypes');
const parser = require('./parse'); //生成ast
const traverse = require('./traverse'); //遍历ast
class T { //包含两种方式1.转化成新的AST节点，验证AST的类型
    static isJSXElement(node) {
        return nodeTypes.JSXElement === node.type;
    }
    static isJSXText(node) {
        return nodeTypes.JSXText === node.type;
    }
    static nullLireral() {
        return { type: nodeTypes.NullLiteral};
    }
    //字面量类型节点
    static stringLiteral(value) {
        return { type: nodeTypes.StringLiteral, value };
    }
    static callExpression(callee, _argements) { 
        return {type: nodeTypes.CallExpression, callee, _argements}
    }
    static memberExpression(object, property) { 
        return {type: nodeTypes.MemberExpression, object, property }
    }
    static identifier(name) { 
        return { type: nodeTypes.Identifier, name };
    }
    static objectExpression(properties) { 
        return { type: nodeTypes.ObjectExpression, properties };
    }
    static property(key, value) { 
        return {type: nodeTypes.Property, key, value}
    }


}

//转换ast的单个节点为新的方法节点
function transform(node) {
    if (!node) return T.nullLireral();
    if (T.isJSXElement(node)) {
        //是个jsx元素

        let callee = T.memberExpression(
            T.identifier('React'),
            T.identifier('createElement')
        );
        let _arguments = [];
        let openingElement = node.openingElement;
        let elementType = T.stringLiteral(openingElement.name.name);
        let objectExpression = T.objectExpression(
            openingElement.attributes.length
                ? openingElement.attributes.map(attr => T.property(
                    T.identifier(attr.name.name),
                    T.stringLiteral(attr.value.value)
                ))
                : T.nullLireral
        )
        _arguments = [elementType, objectExpression, node.children.map(child => { 
            return transform(child);
        })]
        return T.callExpression(callee, _arguments);
    } else if (T.isJSXText(node)) {
        //是个文本元素
        return T.stringLiteral(node.value);
    }
}



function transformer(ast) {
    traverse(ast, {
        JSXElement(nodePath, parent) {
            //传入一个JSXElement的节点，返回一个方法调用的新节点
            let newNode = transform(nodePath.node);
            nodePath.replaceWith(newNode);
        }
    })
}

module.exports = transformer;

let sourceCode = '<h1 id="title"><span>hello</span>world</h1>';
let ast = parser(sourceCode);
transformer(ast);
console.log(JSON.stringify(ast, null, 2));

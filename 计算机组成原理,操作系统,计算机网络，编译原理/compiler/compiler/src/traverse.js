/**
 *AST语法树的遍历 
 */

const nodeTypes = require('./nodeTypes');
const parser = require('./parse');

//深度优先遍历
function traverse(ast, vistor) { 
    traverseNode(ast, null);
    //遍历数组
    function traverseArray(array, parent) {
        array.forEach(el => {
            traverseNode(el, parent);
        });
    }
    function traverseNode(node, parent){
        let methods = vistor[node.type];
        if (methods) { 
            if (typeof methods === 'function') {
                methods({ node }, parent);
            } else { 
                methods.enter({ node }, parent);
            }
         }
        switch (node.type) { 
            case nodeTypes.Program:
                traverseArray(node.body, node);
                break;
            case nodeTypes.ExpressionStatement:
                traverseNode(node.expression, node);
                break;
            case nodeTypes.JSXElement:
                traverseNode(node.openingElement, node);
                traverseArray(node.children, node);
                traverseNode(node.closingElement, node);
                break;
            case nodeTypes.JSXOpeningElement:
                traverseNode(node.name, node);
                traverseArray(node.attributes, node);
                break;
            case nodeTypes.JSXAttribute:
                traverseNode(node.name, node);
                traverseNode(node.value, node);
                break;
            case nodeTypes.JSXClosingElement:
                traverseNode(node.name, node);
                break;
            case nodeTypes.JSXIdentifier:
            case nodeTypes.JSXText:
            case nodeTypes.Literal:
                break;
            default:
                break;

        }
        if (methods && methods.exit) {
            methods.exit({node}, parent);
        }
    }    
}

module.export = traverse;


let sourceCode = '<h1 id="title"><span>hello</span>world</h1>';
let ast = parser(sourceCode);
traverse(ast, {
    JSXOpeningElement: {
        enter: (nodePath, parent) => {
            
            console.log('进入开始元素', nodePath.node);
         },
        exit: (nodePath, parent) => { 
            console.log('离开开始元素', nodePath.node);
        }
    }
})








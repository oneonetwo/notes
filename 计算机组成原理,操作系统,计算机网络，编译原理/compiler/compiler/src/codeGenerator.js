const nodeTypes = require('./nodeTypes');

function codeGenerator (node){
    let type = node.type;
    switch(type){
        case nodeTypes.Program:
            return node.body.map(codeGenerator).join('\n');
        case nodeTypes.ExpressionStatement:
            return codeGenerator(node.expression);
        case nodeTypes.CallExpression: 
            return `${codeGenerator(node.callee)}(${node.arguments.map(codeGenerator).join(', ')})`;
        case nodeTypes.MemberExpression: //生成React.createElement
            return `${codeGenerator(node.object)}\.${codeGenerator(node.property)}`;
        case nodeTypes.Identifier:
            return node.name;
        case nodeTypes.StringLiteral: //字面量的值
            return `"${node.value}"`; 
        case nodeTypes.ObjectExpression:
            return `\{${node.properties.map(codeGenerator).join(', ')}\}`;
        case nodeTypes.Property:
            return `${codeGenerator(node.key)}:${codeGenerator(node.value)}`;
        case nodeTypes.NullLiteral:
            return `null`;
        default:
            return `null`;
    }
}

module.exports = codeGenerator;

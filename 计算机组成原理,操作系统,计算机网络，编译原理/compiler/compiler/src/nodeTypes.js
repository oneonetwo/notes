/*
 * @Descripttion:
 * @version:
 * @Author: D
 * @Date: 2023-02-16 19:20:40
 * @LastEditors: yjy
 * @LastEditTime: 2023-02-19 23:43:03
 */
exports.Program = "Program"; //根节点
exports.ExpressionStatement = "ExpressionStatement";//表示语句
exports.JSXElement = "JSXElement"; //jsx元素
exports.JSXOpeningElement = "JSXOpeningElement";//开始元素
exports.JSXClosingElement = "JSXClosingElement";//结束元素
exports.JSXIdentifier = "JSXIdentifier"; //标识符
exports.JSXAttribute = "JSXAttribute";//属性
// exports.AttributeKey = "AttributeKey";//属性键
exports.Literal = "Literal"; //字面量
exports.StringLiteral = "StringLiteral"; //字符串字面量
exports.JSXText = "JSXText";//文本


exports.NullLiteral = "NullLiteral";//空的null节点
exports.CallExpression = "CallExpression"; //调用函数类型
exports.MemberExpression = "MemberExpression";
exports.Identifier = "Identifier";
exports.ObjectExpression = "ObjectExpression";
exports.Property = "Property";



// {
//     "type": "LeftParentheses",
//     "value": "<"
//   },
//   {
//     "type": "JSXIdentifier",
//     "value": "h1"
//   },
//   {
//     "type": "AttributeKey",
//     "value": "id"
//   },
//   {
//     "type": "AttributeStringValue",
//     "value": "title"
//   },
//   {
//     "type": "RightParentheses",
//     "value": ">"
//   },
//   {
//     "type": "LeftParentheses",
//     "value": "<"
//   },
//   {
//     "type": "JSXIdentifier",
//     "value": "span"
//   },
//   {
//     "type": "RightParentheses",
//     "value": ">"
//   },
//   {
//     "type": "JSXText",
//     "value": "hello"
//   },
//   {
//     "type": "LeftParentheses",
//     "value": "<"
//   },
//   {
//     "type": "Backslash",
//     "value": "/"
//   },
//   {
//     "type": "JSXIdentifier",
//     "value": "span"
//   },
//   {
//     "type": "RightParentheses",
//     "value": ">"
//   },
//   {
//     "type": "JSXText",
//     "value": "world"
//   },
//   {
//     "type": "LeftParentheses",
//     "value": "<"
//   },
//   {
//     "type": "Backslash",
//     "value": "/"
//   },
//   {
//     "type": "JSXIdentifier",
//     "value": "h1"
//   },
//   {
//     "type": "RightParentheses",
//     "value": ">"
//   }


// "type": "Program",
// "body": [{
//     "type": "ExpressionStatement",
//     "expression": {
//         "type": "JSXElement",
//         "openingElement": {
//             "type": "JSXOpeningElement",
//             "name": {
//                 "type": "JSXIdentifier",
//                 "name": "h1"
//             },
//             "attribute": [{
//                 "type": "JSXAttribute",
//                 "name": {
//                     "type": "JSXIdentifier",
//                     "name": "id"
//                 },
//                 "value": {
//                     "type": "Literal",
//                     "value": "title"
//                 }
//             }]
//         },
//         "closingElement": {
//             "type": "JSXClosingElement",
//             "name": {
//                 "type": "JSXIdentifier",
//                 "name": "h1"
//             }
//         },
//         "children": [{
//                 "type": "JSXElement",
//                 "openingElement": {
//                     "type": "JSXOpeningElement",
//                     "name": {
//                         "type": "JSXIdentifier",
//                         "name": "span"
//                     },
//                     "attribute": []
//                 },
//                 "closingElement": {
//                     "type": "JSXClosingElement",
//                     "name": {
//                         "type": "JSXIdentifier",
//                         "name": "span"
//                     }
//                 },
//                 "children": [{
//                     "type": "JSXText",
//                     "value": "hello"
//                 }]
//             },
//             {
//                 "type": "JSXText",
//                 "value": "world"
//             }
//         ]
//     }
// }]
// }
 /* We're just going to take our string of code and break it down into an array
 * of tokens.
 * For the following syntax:
 *
 *   (add 2 (subtract 4 2))
 *
 * Tokens might look something like this:
 *
 *   [
 *     { type: 'paren',  value: '('        },
 *     { type: 'name',   value: 'add'      },
 *     { type: 'number', value: '2'        },
 *     { type: 'paren',  value: '('        },
 *     { type: 'name',   value: 'subtract' },
 *     { type: 'number', value: '4'        },
 *     { type: 'number', value: '2'        },
 *     { type: 'paren',  value: ')'        },
 *     { type: 'paren',  value: ')'        },
 *   ]
 */
function tokenizer(input){
    let current = 0
    let tokens = []
    while(current < input.length){
        let w = input[current]
        if(w === '('){
            tokens.push({type: 'paren', value: w})
            current++
            continue
        }
        if(w === ')'){
            tokens.push({type: 'paren', value: w})
            current++
            continue
        }
        if(/\s/.test(w)){
            current ++;
            continue
        }
        //   (add 123 456)
        if(/[0-9]/.test(w)){
            let value = ''
            while(/[0-9]/.test(w)){
                value += w
                w = input[++current]
            }
            tokens.push({type: 'paren', value})
            continue
        }
        //   (concat "foo" "bar")
        if(w === '"'){
            w = input[++current]
            let value = ''
            while(w!=='"'){
                value += w
                w = input[++current]
            }
            current ++
            tokens.push({type: 'string', value})
            continue
        }
        //   (add 2 4)
        let LETTERS = /[a-z]/i;
        if(LETTERS.test(w)){
            let value = ''
            while(LETTERS.test(w)){
                value += w
                w = input[++current]
            }
            tokens.push({type: 'name', value})
            continue
        }
        throw new Error("I don't know what this character is : "+ w)
    }
    return tokens;
}
/**
 *   [{ type: 'paren', value: '(' }, ...]   =>   { type: 'Program', body: [...] }
 * 
 * 
 */
function parser(tokens){
    let current = 0
    let ast = {
        type: 'Program',
        body: [],
    }
    function renderNode(){
        let node = null
        let token = tokens[current]
        if(token.value === '('){
            node = {
                type: 'CallExpression',
                params: []
            }
            token = tokens[++current]
            while(token.value !== ')'){
                if(token.type === 'name'){
                    node.name = token.value
                }
                if(token.type === 'number'){
                    node.params.push({
                        type: 'NumberLiteral',
                        value: token.value
                    })
                }
                if(token.value === '('){
                    node.params.push(renderNode())
                }
                token = tokens[++current]
            }
        }
        return node
    }
    // ast.body.push(renderNode())
    //   (add 2 2)
    //   (subtract 4 2)
    //
    while (current < tokens.length) {
        ast.body.push(walk());
    }
    return ast
}


function traverser(ast, vistor){

    function traverserArray(array, parent){
        array.forEach(element => {
            traverserNode(element, parent)    
        });
    }
    function traverserNode(node, parent){
        let methods = vistor[node.type]
        if(methods && methods.enter){
            methods.enter(node, parent)
        }
        switch(node.type){
            case 'Program':
                traverserArray(node.body, node)
                break
            case 'CallExpression':
                traverserArray(node.params, node)
                break
            case 'NumberLiteral':
            case 'StringLiteral':
                break
            default:
                throw new TypeError(node.type)
        }
        if (methods && methods.exit) {
            methods.exit(node, parent);
        }
    }
    traverserNode(ast, null)
}

function transformer(ast){
    let newAst = {
        type: 'Program',
        body: [],
    }
    ast._context = newAst.body

    traverser(ast, {
        NumberLiteral: {
            enter(node, parent){
                parent._context.push({
                    type: 'NumberLiterral',
                    value: node.value
                })
            },
        },
        StringLiteral: {
            enter(node, parent){
                parent._context.push({
                    type: 'StringLiteral',
                    value: node.value
                })
            },
        },
        CallExpression: {
            enter(node, parent){
                let expression = {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: node.name
                    },
                    arguments: []
                }
                node._context = expression.arguments
                if (parent.type !== 'CallExpression') {
                    expression = {
                      type: 'ExpressionStatement',
                      expression: expression,
                    };
                }
                parent._context.push(expression);
            }
        },
    })
    return newAst
}

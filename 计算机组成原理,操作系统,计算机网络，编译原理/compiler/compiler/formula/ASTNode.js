/**
 * 定义AST的节点
 */
class ASTNode {
    constructor(type, value){
        this.type = type;
        if(value) this.value = value;
    }
    appendChild(child){
        if(!child) return;
        if(!this.children) this.children = []
        this.children.push(child);
    }
}

module.exports = ASTNode;
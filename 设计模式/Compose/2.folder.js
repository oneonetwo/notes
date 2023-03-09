function Folder(name){
    this.name = name;
    this.children = [];
    this.parent = null;
    this.level = 0;
}
Folder.prototype.add = function (child) {
    child.level = this.level + 1;
    child.parent = this;
    this.children.push(child);
}
Folder.prototype.show = function () {
    console.log(' '.repeat(this.level) + '文件夹' + this.name);
    for (let i = 0; i < this.children.length; i++) {
        this.children[i].show();
    }
}
Folder.prototype.remove = function () {
    if (!this.parent) return;
    for (let i = 0; i < this.parent.children.length; i++) {
        let current = this.parent.children[i];
        if (current === this) {
            return this.parent.children.splice(i, 1);
        }
    }
}
function File(name) {
    this.name = name;
}
File.prototype.add = function () {
    throw new Error(`文件下面不能再添加文件`);
}
File.prototype.show = function () {
    console.log(' '.repeat(this.level) + '文件' + this.name);
}
let folder = new Folder('视频');
let vueFolder = new Folder('Vue视频');
let reactFolder = new Folder('React视频');
let vueFile = new File('Vue从入门到精通');
let reactFile = new File('React从入门到精通');
folder.add(vueFolder);
folder.add(reactFolder);
vueFolder.add(vueFile);
reactFolder.add(reactFile);

folder.show();
vueFolder.remove();
folder.show()
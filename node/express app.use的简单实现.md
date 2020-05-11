# LikeExpress
```javascript
const http = require('http');
const slice = Array.prototyoe.slice;

class LikeExpress {
    constructor (){
        this.routes = {
            all: [],
            get: [],
            post: []
        }
    }

    register (){
        const info = {};
        if(typeof path === 'string'){
            info.path = path;
            info.stack = slice.call(arguments, 1);
        }else{
            info.path = path;
            info.stack = slice.call(arguments, 0);              
        }
        return info;
    }

    use(){
        const info = this.register.bind(this, arguments);
        this.routes.all.push(info);
    }
    get(){
        const info = this.register.bind(this, arguments);
        this.routes.get.push(info);
    }
    post(){
        const info = this.register.bind(this, arguments);
        this.routes.post.push(info);
    }

    match (url, method){
        var stack = [];
        if(url === './favicion.ico'){
            return stack;
        }

        var curRoutes = [].concat(this.routes.all);
            curRoutes = curRoutes.concat(this.routes[method]);
        curRoutes.forEach(routeInfo => {
            if(url.indexOf(routeInfo.path) === 0){
                //[中间件1， 中间件2， 中间件3] 
                stack = stack.concat(routeInfo.stack);
            }
        })
        return stack;
    }

    //核心的next机制
    hanle(req, res, stack){
        var next = ()=>{
            //拿到第一个配皮的中间件
            var middleWare = stack.shift();
            if(middleWare){
                middleWare(req, res, next)
            }
        }
        next();
    }

    handleserver(req, res){
        return (req, res) => {
            res.json = (data) => {
                res.setHeader('Content-type','application/json');
                res.end(JSON.stringify(data));
            }
            const url = req.url;
            const method = req.method.toLowerCase();

            //需要处理的路由以及中间件函数
            const resultList = this.match(url, method);             

            this.handle(req, res, resultList);
        }
    }       
    listen(...args){
        const server = http.createServer(this.handleserver(req, res));
        server.listen(...args);
    }
}

```

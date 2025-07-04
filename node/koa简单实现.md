# LikeKoa
1. 源码
```javascript
const http = require('http');

// 把中间件组合下  组合洋葱
var compose = function(middlewareList){
    return (ctx) => {
      var dispatch = (i) => {
        var fn = middlewareList[i];
          try{
            return Promise.resolve(
              fn(ctx, dispatch.bind(null, i+1))
            )
          }catch(err){
            return Promise.reject(err);
          }
      }
      return dispatch(0);				
    }
}
class likeKoa{
  constructor(){
    this.middlewareList = [];
  }

  use(fn){
    this.middlewareList.push(fn);
    return this;
  }

  handleServer(req, res){
    return (req, res) => {
      const ctx = {
        req,
        ctx
      }
      return compose(this.middlewareList)(ctx);
    }
  }
  listen(...args){
    const server = http.createServer(this.handleServer(req, res));
    server.listen(...args);
  }
}
```

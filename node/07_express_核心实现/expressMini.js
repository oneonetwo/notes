
  const http = require('http');
  const url = require('url');
  
  class ExpressMini {
    constructor() {
      // 存储中间件和路由
      this.routes = {
        all: [],   // app.use 注册的中间件
        get: [],   // app.get 注册的路由
        post: []   // app.post 注册的路由
      };
    }
  
    // 注册中间件
    use(path, handler) {
      if (typeof path === 'function') {
        handler = path;
        path = '/';
      }
      this.routes.all.push({ path, handler });
    }
  
    // 注册 GET 路由
    get(path, handler) {
      this.routes.get.push({ path, handler });
    }
  
    // 注册 POST 路由
    post(path, handler) {
      this.routes.post.push({ path, handler });
    }
  
    // 匹配路由
    _match(method, url) {
      const matched = {
        handlers: []
      };
  
      // 合并所有相关路由
      const routes = [...this.routes.all, ...this.routes[method]];
  
      for (const route of routes) {
        // 简单路径匹配 (实际 Express 使用 path-to-regexp)
        if (url.startsWith(route.path) || route.path === '/') {
          matched.handlers.push(route.handler);
        }
      }
  
      return matched;
    }

	_handle(req, res) {
        console.log('req', req.url)
        const method = req.method.toLowerCase();
        const path = req.url;
        

		const matched = this._match(method, path);

        if (matched.handlers.length) {
            this._next(req, res, matched.handlers);
          } else {
            res.end('404 Not Found');
          }
	}

    _next(req, res, handlers, index = 0){
        const handler = handlers[index]
        if(!handler){
            return
        }
        handler(req, res, ()=> {
            this._next(req, res, handlers, index + 1)
        })
    }

	listen(port, callback) {
		const server = http.createServer((req, res) => {
			//TODO: 处理请求
			this._handle(req, res);
		});
		server.listen(port, callback);
	}
}

module.exports = ExpressMini;

class LikeKoa extends Emitter{
    constructor(){
        super()
        this.middlewares = []
    }   
    /**
     * 注册中间件。Koa 的 use 方法将传入的中间件函数添加到 middlewares 数组中。
     */
    use(fn){
        this.middlewares.push(fn)
        return this
    }
    _callback(){
        let fn = this._compose(this.middlewares)
        const handleRequest = (req, res) =>{
            let ctx = _createContext(req, res)
            this._handleRequest(ctx, fn)
        }
        return handleRequest
    }
    /**
     *     实现了中间件的“洋葱模型”执行逻辑。它是一个递归函数，会依次执行每个中间件，并传递一个 next 函数供中间件调用。
     */
    _compose(middlewares){
        return (ctx, next)=>{
            let index = -1
            return dispatch(0)
            function dispatch(i){
                if(i<=index) return Promise.reject(new Error('next() called multiple times'))
                index = i
                let fn = middlewares[i]
                if(i===middlewares.length) fn = next
                if(!fn) return Promise.resolve()
                try {
                    return Promise.resolve(fn(ctx, dispatch.bind(null, i+1)))
                } catch (error) {   
                    return Promise.reject(err)  
                }
            }
        }
    }
    /**
     * 创建一个简化的上下文（context）对象，包含 req 和 res 对象。Koa 实际的 ctx 对象要比这个更复杂，封装了更多的请求和响应细节。
     */
    _createContext(req, res){
        //处理ctx 省略
        return {req, res}
    }

    _handleRequest(ctx, fnMiddleware){
        const res = ctx.res
        res,statusCode = 404
        const onerror = err => ctx.onerror(err)
        const handleResponse = () => {
            res.end(ctx.body)
        }
        onFinished(res, onerror)
        //处理响应逻辑
        return fnMiddleware(ctx).then(handleResponse).catch(onerror)
    }

    listener(...args){
        let server = http.createServer(this._callback())
        server.listen(...args)
    }
}
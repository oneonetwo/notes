class LikeKoa extends Emitter{
    constructor(){
        super()
        this.middleware = []
    }
    use(fn){
        this.middleware.push(fn)
    }
    listen(...args){
        const server = http.createServer(this.callback())

        server.listen(...args)

    }
    callback(req, res){
        //组合函数
        const fn = compose(this.middleware)
        return (req, res)=>{
            //处理req, res到ctx
            return this.handleRequest(ctx, fn)
        }
    }
    handleRequest(ctx, fnMiddleware){
        //处理 响应逻辑
        const res = ctx.res
        res.statusCode = 404
        const handleResponse = ()=>respond(ctx)
        const onerror = err=>ctx.onerror(err)
        return fnMiddleware(ctx).then(handleResponse).catch(onerror)
    }
}

function compose(middleware){
    let index = -1
    return (ctx)=>{
        const dispatch = (i)=>{
            let fn = middleware[i]
            try {
                return Promise.resolve(fn(ctx, dispatch.bind(null, i+1)))
            } catch (error) {
                return Promise.reject(error)
            }
        }
        return dispatch(0)
    }
}
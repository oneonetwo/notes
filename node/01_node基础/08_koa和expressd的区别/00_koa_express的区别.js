/**
 * 架构层面
 * 1. express是完整的和强大的，内置了很多好用的功能（静态资源，路由，请求，响应）
 * 2. koa简单和自由，只包含核心的功能，并不会对其他的中间件进行任何的限制
 *      - get,post的方式也没提供，需要三方的中间件
 * 3. koa和express的核心都是中间件
 *      - 他们在中间件的实现上，他们的中间件的执行机制不同，特别是针对某个中间件中包含的异步操作时
 *      - 中间件的执行顺序   有区别
 *          - express的next是void ，koa的next是promise函数
 * 
 * 
 * 
 */


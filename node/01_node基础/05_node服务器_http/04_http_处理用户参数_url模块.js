const http = require('http')
const { URL } = require('url');


// 创建server服务器
const server = http.createServer((request, response) => {
    // 1. 解析url
    // const urlString = req.url
    // const { pathname, query } = url.parse(urlString)

    // //2. 解析query offset=100
    // const queryString = query
    // const searchParams = new URLSearchParams(queryString)
    const reqUrl = new URL(request.url, `http://${request.headers.host}`)
    const searchParams = reqUrl.searchParams

    //3. 解析body参数 request是一个readable可读流
    request.setEncoding('urt-8')
    request.on('data', data => {
        const loginInfo = JSON.parse(data);

        console.log(data)
    })
    request.on('end', _ => {
        response.end('登录成功，')
    })
});

// 开启server服务器
server.listen(8090, () => {
    console.log('服务器开启成功了')
});
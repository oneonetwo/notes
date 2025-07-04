// 1：构建一个简易静态文件服务器

const http = require('http')
const fs = require('fs')
const path = require('path')

const MIME_TYPE = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.jpeg': 'image/jpeg',
}

const server = http.createServer((req, res)=>{
    const url = decodeURIComponent(req.url==='/'?'/index.html':req.url)
    const filePath = path.join(__dirname, 'public', url)

    if(!filePath.startsWith(path.join(__dirname, 'public'))){
        res.writeHead(403)
        res.end('403 Forbidden')
        return
    }
    // stat 是获取文件信息 
    fs.stat(filePath, (err, stats)=>{
        if(err || !stats.isFile()){
            res.writeHead(404, {'Content-Type': 'text/plain'})
            return res.end('404 Not Found')
        }
        // 获取后缀名和对应的content-type 
        const ext = path.extname(filePath).toLowerCase()
        const contentType = mimeType[ext] || 'application/octet-stream'
        
        // 设置响应头
        res.writeHead(200, {'Content-Type': contentType})
        fs.createReadStream(filePath).pipe(res)

    })
})

server.listen(3000, ()=>{
    console.log(`✅ 静态文件服务器已启动：http://localhost:${PORT}`);
})

/**
 * 一. content-type 数据类型协商，几种方式的区别 form-data, x-www-form-urlencoded, raw, binary, 
 *  1.  form-data
 *      - 用途
 *            1. 常用于文件上传以及需要传递复杂表单数据的场景
 *            2. 每个字段作为一个独立的部分上传，可以包含文件、文本、JSON等。
 *      - 特点：
 *            1. 使用multipart/form-data编码类型。
 *            2. 数据被分割成多个部分，每部分有自己的Content-Disposition头部，用于描述这部分数据。 不同的key参数之间是有boundary分割的。每个参数都有Content-Disposition: form-data; name="xxx"信息
 *      - 前端使用：
 *            1. 可以通过HTML的<form>标签，设置enctype="multipart/form-data"属性。
 *            2. 使用JavaScript的FormData对象。

 * 
 *  2.  `x-www-form-urlencoded`
 *      - 用途
 *            1. 适用于传递简单表单数据，比如登录表单，搜索参数等。
 *            2. 数据在URL编码后发送。
 *      - 特点：
 *            1. 使用application/x-www-form-urlencoded编码类型。
 *            2. 数据被编码为键值对（key-value pairs），并用&符号连接。
 *      - 前端使用：
 *            1. 可以通过HTML的<form>标签，默认的enctype即为application/x-www-form-urlencoded。
 *            2. 使用JavaScript的URLSearchParams对象。
 *  3.   `raw`
 *      - 用途
 *            1. 适用于传输原始数据，如JSON、XML、纯文本等。
 *            2. 常用于API请求，需要传递复杂的JSON对象时。
 *      - 特点：
 *            1. 不进行任何编码，直接传输原始数据。
 *            2. 需要设置合适的Content-Type，如application/json，text/plain等。
 *      - 前端使用：
 *            1. 使用JavaScript的fetch或XMLHttpRequest发送字符串格式的数据。
 *  4.   `binary`
 *      - 用途
 *            1. 适用于传输二进制数据，如文件、图像、视频等。
 *            2. 直接传输文件的二进制内容。
 *      - 特点：
 *            1. 数据以二进制格式传输，通常需要在请求头中明确指定Content-Type，如application/octet-stream。
 *      - 前端使用：
 *            1. 使用JavaScript的ArrayBuffer或Blob对象
 * 
 * 二. 客户端数据的请求方式
 * 
 * 三. 服务端处理请求的方式
 * 
 * 
 */

//前端方式
// 1. <form id="uploadForm" enctype="multipart/form-data"></form>
        var formData = new FormData(form);
        fetch("/upload", {
            method: "POST",
            body: formData,
        });
        // node:
        const upload = multer({ dest: 'uploads/' });
        app.post('/upload', upload.single('file'), (req, res) => {
            console.log(req.file); // File information
            console.log(req.body); // Other form fields
            res.send('File uploaded successfully');
        });


// 2. 使用application/x-www-form-urlencoded编码类型。
        var formData = new URLSearchParams(new FormData(form));
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData,
        });
        //node: 
        app.use(express.urlencoded({ extended: true }));

        app.post('/login', (req, res) => {
        console.log(req.body); // Parsed body
        res.send('Login data received');
        });

//3. raw application/json 处理application/json类型的请求体
        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: 1 }),
        });
        // node: 
        app.use(express.json())


//4. binary 处理二进制数据，可以直接读取请求的原始数据流。以下示例展示了如何处理application/octet-stream类型的请求体。
const file = event.target.files[0];
fetch('/upload', {
  method: 'POST',
  headers: {
    'Content-Type': file.type
  },
  body: file
});

//node: 
    app.post('/upload-binary', (req, res) => {
        let data = [];
    
        req.on('data', chunk => {
        data.push(chunk);
        });
    
        req.on('end', () => {
        const buffer = Buffer.concat(data);
        console.log(buffer); // Process the binary data
        res.send('Binary data received');
        });
    });
  
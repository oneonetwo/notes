/**
 * axios 框架： 
 * 1. 客户端用的 new XMLHttpRequest();
 * 2. node中底层用的http模块
 */

const axios = require('axios')

axios.get('http://localhost:8000').then(res => {
    console.log(res.data);
})
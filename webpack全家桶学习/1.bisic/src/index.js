// 直接引入
// import _ from 'lodash';
// entry
// require('@babel/polyfill');
// require('core-js/stable');
// require('regenerator-runtime/runtime');

// import Promise  from "babel-runtime/core-js/promise";



// expose 配合使用
// require('lodash');

// cdn方式引入
// import _ from 'lodash';
// alert(_.join(['a', 'b', 'c'], '_'));


const p = new Promise((resolve) => {
    resolve('ok');
});
console.log(p);

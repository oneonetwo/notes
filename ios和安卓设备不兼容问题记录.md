1. css 的var变量的不支持  ios 15
2. 正则的 后顾肯定和否定不支持 ?<= ?<!
3.  安卓8.1 
    1.  ❌ import 语法报错	构建产物未正确转译为 ES5
    2.  ❌ ?. 可选链语法报错	Android 8.1 WebView 不支持，未使用 babel 转换
    3.  ❌ legacy chunk 依然报错	没有正确设置 Vite 的 legacy 插件
    4. 解决方案 @vitejs/plugin-legacy

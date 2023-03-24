module.exports = {
    // root: true, //跟配置文件，
    parser: "babel-eslint", //需要一个parser解析器帮我们把源代码抽象成语法树，
    extends: "airbnb", //继承airbnb
    //指定解析器选项
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 2015,
    },
    //指定脚本运行环境
    env: {
        browser: true,
    },
    rules: {
        "indent": "off", //缩进风格
        "quotes": "off",    //引号风格
        "no-console": "error"//禁止使用no-console
    }
}
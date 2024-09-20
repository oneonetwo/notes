### source-map https://webpack.docschina.org/configuration/devtool/
1. `source-map` 是一种调试工具，它允许在打包后的代码和源代码之间建立映射，使开发者在调试打包后的代码时能够看到原始源代码的对应位置。
2. Webpack 使用 source-map 来帮助开发者追踪打包后的 JavaScript 文件中某个位置对应的原始源文件中的代码，从而方便调试和排查问题。
3. `source-map` 的原理
    1. 映射关系：source-map 文件是一个 JSON 格式的文件，里面保存了从编译、打包、压缩后的代码到源代码的映射关系。它将打包后的代码行列号与源代码中的行列号一一对应。
    2. 调试工具的支持：现代浏览器的开发者工具支持 source-map。在加载打包后的代码时，如果找到了 source-map 文件，浏览器可以利用它显示出原始源代码，而不是显示经过打包、压缩后的代码。
    3. 调试体验：在开发者工具中设置断点、查看错误日志时，浏览器会通过 source-map 映射来定位原始代码中的位置。这样，开发者无需面对难以理解的打包后代码，就能调试项目。
4. 生成过程
    1. `打包后的代码`：当 Webpack 对代码进行打包时，会生成一个 bundle.js，这个文件是由源代码经过打包、压缩、混淆等处理后生成的，通常很难读懂。
    2. `生成 source-map`：Webpack 根据配置，会为每个打包后的文件生成一个 .map 文件（例如 bundle.js.map），其中包含源代码和打包后代码之间的映射关系。打包后的代码末尾会有一行注释，指向相应的 source-map 文件：
    ```js
    //# sourceMappingURL=bundle.js.map
    ```
5. source-map 文件的内容
    > source-map 文件是一个 JSON 文件，包含以下几个部分：
    1. 版本信息: `version` 用来标识 source-map 的版本。
    2. 文件名: `file` 表示这个映射文件所对应的打包文件名。
    3. 原始文件: `sources` 数组，包含源代码文件的文件名。
    4. 源代码内容: `sourcesContent` 可选，包含源代码的实际内容。
    5. 映射关系: `mappings` 是最关键的一部分，它包含了压缩后的代码和源代码的对应关系（使用一种紧凑的编码方式）。
    ```js
    // # 示例 source-map 片段：
        {
        "version": 3,
        "file": "bundle.js",
        "sources": ["src/index.js", "src/utils.js"],
        "sourcesContent": ["console.log('Hello World');", "function add(a, b) { return a + b; }"],
        "mappings": "AAAA,SAASA,IAAI,CAAC,GAAG,EAAE"
        }
    ```

6. Webpack 中的 devtool 选项
    1. `false`: 不使用source-map,也就是没有任何和source-map相关的内容。
    2. `none`: production模式下的默认值(什么值都不写),不生成source-map
    3. `eval` :development模式下的默认值,不生成source-map
    4. `source-map`：生成一个外部 .map 文件，包含完整的映射，适合生产环境使用，但生成速度较慢。
    5. `inline-source-map`：将 source-map 以 Base64 的方式嵌入打包后的文件，适合开发环境调试，但文件体积较大。
    6. `cheap-source-map`：生成没有列信息的 source-map，只精确到行，适合调试较简单的代码，速度较快。
    7. `eval-source-map`：将 source-map 信息嵌入到每个模块中，以 eval 形式包裹代码，生成速度最快，但不适合生产环境。
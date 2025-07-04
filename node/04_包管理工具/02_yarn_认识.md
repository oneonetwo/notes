#### Yarn 是一个 JavaScript 包管理工具，旨在解决 NPM 的一些问题，如安装速度慢、依赖版本不一致等。Yarn 提供了更快、更可靠、更安全的包管理方式。下面我们详细介绍 Yarn 的原理和使用方法。

1. Yarn 的原理
    1. 并行安装：Yarn 会并行地下载和安装包，这大大提高了安装速度。相比于 NPM 的串行安装，Yarn 能更有效地利用网络和 CPU 资源。
    2. 离线模式：Yarn 会在第一次下载包时将其缓存到本地。在后续安装中，如果本地缓存中已经存在需要的包，Yarn 就会直接从缓存中读取，而不需要再去下载。
    3. 一致性：Yarn 引入了 yarn.lock 文件来锁定依赖项的具体版本。与 NPM 的 package-lock.json 类似，yarn.lock 文件确保了不同环境中的依赖版本一致。
    4. 更好的网络性能：Yarn 通过请求捆绑和智能重试机制，提高了网络请求的效率和稳定性。
2. Yarn 的安装 `npm install -g yarn`
3. Yarn 的使用
    1. `yarn init` 项目初始化 创建package.json
    2. `yarn add <package-name>` 添加一个依赖包
        - `yarn add axios --add` 
        - `yarn add axios@6.5`
    3. `yarn install` 安装所有依赖
    4. `yarn remvoe axios` 移除
    5. `yarn upgrade axios@7.4` 升级依赖包
    6. `yarn upgrade` 升级所有包
    7. `yarn start` 运行
    8. `yarn list` 查看依赖树
    9. `yarn info 包名` 查看包的详细信息
    10. `yarn cache clean` 清理缓存
    11. `yarn install --force`重新安装所有包

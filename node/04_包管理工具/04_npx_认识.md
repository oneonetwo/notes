1. npx 是 Node.js 附带的一个命令行工具，随着 npm 版本 5.2.0 一起发布。npx 主要用于执行本地或远程的 npm 包中的可执行文件（command line executables），简化了命令行工具的使用。

2. npx 的特点和用途
    - 临时使用命令行工具：无需全局安装工具包，可以直接运行某个工具。例如，可以使用 npx create-react-app my-app 直接创建一个 React 应用，而不需要先全局安装 create-react-app 包。
    - 避免全局污染：可以避免在全局范围内安装很多命令行工具，减少全局依赖包的数量，防止版本冲突。
    - 运行本地依赖包：可以执行项目中 node_modules 里的可执行文件，而不需要添加复杂的脚本路径。
    - 指定包版本运行：可以指定特定版本的包进行运行，而不需要全局安装该版本的包。
    - 简化的临时环境：可以临时安装和使用一次性的包，在命令执行结束后清理环境。
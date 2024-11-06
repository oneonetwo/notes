import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import qiankun from 'vite-plugin-qiankun'
import { resolve } from 'path'

const isDev = process.env.NODE_ENV === 'development'
// https://vite.dev/config/
export default defineConfig({
  base: isDev ? '/' : 'http://127.0.0.1:8056/',
  build: {
    outDir: resolve(__dirname, '../dist-sub')
  },
  plugins: [
    vue(),
    //这里的名称要和主应用改造是配置项中的name保持一致
    qiankun('sub-app-vite', {
      useDevMode: true
    })
  ],
  server: {
    // 防止开发阶段的assets静态资源加载问题
    // 子应用被主应用加载过去之后代码中加载的静态资源图片
    // 图片地址走主应用地址 http://locahost:8081/assests/a.png
    origin: 'http://localhost:5173',
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*' // 添加跨域头
    }
  },
  resolve: {
    alias: {
      // 1. import.meta 是一个给 ES 模块暴露特定上下文的元数据属性的对象
      // 2. url 属性包含当前模块的 URL 信息
      // 在 Node.js 环境中，它返回类似 file:///path/to/your/project/vite.config.js 的文件 URL
      // new URL(path, base)
      // URL 是一个构造函数，用于解析 URL
      // 第一个参数 './src' 是相对路径
      // 第二个参数 import.meta.url 是基础 URL
      // 它会将相对路径和基础 URL 组合成一个完整的 URL 对象
      // 3. fileURLToPath()
      //  将 URL 对象或字符串转换为文件系统路径
      // 处理跨平台的路径差异（Windows 和 Unix 系统）
      // 返回标准的文件系统路径字符串
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

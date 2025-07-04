##### ws 包的详细说明

1. import { WebSocketServer } from 'ws';
2. 第三方 npm 包（非 Node.js 原生模块）
3. GitHub 仓库：https://github.com/websockets/ws
4. 核心功能
    1. ✅ 实现 WebSocket 服务端 & 客户端
    2. ✅ 支持最新 WebSocket 协议规范
    3. ✅ 轻量高效（专为 Node.js 环境优化）
5. 使用
```js
new webSocketServer({
    port: 8000,
    maxPayload: 1024 * 1024, // 1MB最大消息
    clientTracking: true // 启用连接跟踪
})
```
##### 心跳检测
1. 什么是心跳检测
    1. 一种检测通信双方是否保持连接的机制
    2. 类似人的心跳，定期发送小数据包确认对方"还活着"
    3. WebSocket 连接中用于及时发现连接断开的情况
2. 为什么需要心跳检测
    1. WebSocket 是长连接，可能因网络问题无声无息断开
    2. 防火墙可能会自动切断长时间无数据传输的连接
    3. 及时发现"死连接"，避免资源浪费
    4. 快速响应重连，保证服务可用性
3. 实现方式：
```js
import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 8081 })
// 服务端示例Ping-Pong模式

wss.on('connection', (ws) => {
    // 设置心跳检测间隔（例如30秒）
    const interval = setInterval(() => {
        if (ws.isAlive === false) {
            // 如果上一次心跳没有回应，关闭连接
            clearInterval(interval);
            return ws.terminate();
        }
        
        // 标记当前心跳等待响应
        ws.isAlive = false;
        // 发送ping帧
        ws.ping();
    }, 30000);

    // 监听心跳响应
    ws.on('pong', () => {
        // 收到pong响应，标记连接存活
        ws.isAlive = true;
    });

    // 连接关闭时清理定时器
    ws.on('close', () => {
        clearInterval(interval);
    });


    *********************************
    // 业务数据模式: 自定义心跳消息
     const heartbeat = {
         type: 'heartbeat',
         timestamp: Date.now()
     };
     ws.send(JSON.stringify(heartbeat));

     ********************************
          let lastTime = Date.now();
     
     // 定时器模式: 检查最后通信时间
     setInterval(() => {
         const now = Date.now();
         if (now - lastTime > 60000) { // 60秒无响应
             ws.close();
         }
     }, 30000);
});
```

4. 最佳实践建议
    1. 心跳间隔建议 15-30 秒
    2. 至少等待 2-3 次心跳超时才断开连接
    3. 心跳数据包要尽可能小
    4. 考虑网络延迟，设置合理的超时时间
    5. 断开后实现自动重连机制


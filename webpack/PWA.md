# PWA Progressive Web App 渐进式网络应用
> 1. Service Worker
> 2. Promise
> 3. fetch
> 4. cache API
> 5. Notification API

### Service Worker
1. 服务工作线程的概念和用法
  - 采用JavaScript控制关联的页面或者网站，拦截并修改访问和资源请求，细粒度地缓存资源。
  - 运行在worker上下文，因此它不能访问DOM。相对于驱动应用的主JavaScript线程，它运行在其他线程中，所以不会造成阻塞。它设计为完全异步，同步API（如XHR和localStorage）不能在service worker中使用。

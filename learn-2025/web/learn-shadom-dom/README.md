# Shadow DOM 演示项目

这个项目演示了Shadow DOM的基本概念、用法和常见使用场景。

## 什么是Shadow DOM？

Shadow DOM是Web Components标准的核心部分之一，它允许开发者创建封装的DOM树，该DOM树与主文档隔离，但附加到主文档的某个元素上。Shadow DOM提供了三个重要功能：

1. **DOM隔离**：Shadow DOM内部的DOM结构与主文档隔离，防止冲突
2. **样式隔离**：Shadow DOM内部的样式不会影响外部，外部样式也不会渗透进Shadow DOM内部
3. **组合模型**：通过slot机制，可以将来自Light DOM的内容组合到Shadow DOM结构中

## 使用场景

Shadow DOM适合以下场景：

1. **创建可复用的Web组件**：当你需要创建一个独立的、可复用的UI组件时
2. **防止样式冲突**：在大型应用中，避免CSS规则意外地影响到应用的其他部分
3. **封装复杂的功能**：隐藏实现细节，只暴露必要的API
4. **第三方小部件集成**：将第三方组件安全地嵌入到你的应用中，而不担心样式和DOM冲突
5. **微前端架构**：在复杂的微前端系统中，可以使用Shadow DOM来隔离不同的微应用

## 本项目演示内容

1. **基本的Shadow DOM封装**：展示如何创建和使用基本的Shadow DOM
2. **样式隔离演示**：展示Shadow DOM的样式隔离特性
3. **自定义元素与Shadow DOM**：展示如何将Shadow DOM与自定义元素结合使用
4. **槽位(Slots)使用演示**：展示如何使用Shadow DOM的slots功能来组合内容
5. **主题定制演示**：展示如何使用CSS变量穿透Shadow DOM边界进行主题定制

## 如何运行

只需用浏览器打开`index.html`文件即可查看演示。

## 浏览器兼容性

Shadow DOM (v1)在所有现代浏览器中得到支持，包括：

- Chrome 53+
- Firefox 63+
- Safari 10+
- Edge 79+

## 相关资源

- [MDN Web Docs: Shadow DOM](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components/Using_shadow_DOM)
- [Web Components 官方文档](https://www.webcomponents.org/introduction)
- [Shadow DOM v1: 自包含的 Web 组件](https://developers.google.com/web/fundamentals/web-components/shadowdom) 
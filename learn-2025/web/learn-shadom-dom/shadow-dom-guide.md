# Shadow DOM 使用指南

## 什么是Shadow DOM？

Shadow DOM 是一种浏览器技术，允许在网页中创建独立的 DOM 树，这些树被附加到常规 DOM 树的元素上，但在行为上却是独立的。Shadow DOM 是 Web Components 标准的关键部分之一，用于创建封装的、可复用的组件。

## 核心概念

1. **Shadow Host**: 常规 DOM 中的一个元素，Shadow DOM 会附加到这个元素上
2. **Shadow Root**: Shadow DOM 的开始节点，Shadow DOM 树的根节点
3. **Shadow Tree**: 附加到元素的完整 DOM 子树
4. **Shadow Boundary**: Shadow DOM 和常规 DOM 之间的边界，样式和事件不会跨越这个边界

## 基本用法

### 创建 Shadow DOM

```javascript
// 选择一个宿主元素
const host = document.getElementById('host-element');

// 创建 shadow root
const shadowRoot = host.attachShadow({ mode: 'open' });

// 添加内容到 shadow DOM
shadowRoot.innerHTML = `
  <style>
    p { color: red; }
  </style>
  <p>这是 Shadow DOM 中的内容</p>
`;
```

### Shadow DOM 的模式

创建 Shadow DOM 时有两种模式：

1. **open**: 外部 JavaScript 可以访问 Shadow DOM（通过 `element.shadowRoot`）
2. **closed**: 外部无法访问 Shadow DOM（`element.shadowRoot` 返回 null）

```javascript
// 开放模式
const openShadow = element.attachShadow({ mode: 'open' });

// 封闭模式
const closedShadow = element.attachShadow({ mode: 'closed' });
```

## 样式

### Shadow DOM 中的样式隔离

Shadow DOM 中的样式不会影响外部 DOM，外部样式也不会影响 Shadow DOM 的内部元素。

### 样式封装的例外

有三种方式可以从外部影响 Shadow DOM 中的样式：

1. **继承的属性**：如 `color`, `font-family` 等可以从外部继承
2. **CSS 变量**：通过 CSS 自定义属性（变量）可以穿透 Shadow DOM
3. **:host 选择器**：可以在 Shadow DOM 内部选择宿主元素

```css
/* 在 Shadow DOM 内部 */
:host {
  display: block;
  border: 1px solid black;
}

:host(:hover) {
  border-color: red;
}

:host(.special) {
  font-weight: bold;
}
```

## Slots（插槽）

Slots 允许你从外部向 Shadow DOM 传递内容。这是创建可重用组件的关键机制。

### 基本用法

```html
<!-- Shadow DOM 模板 -->
<template id="my-paragraph">
  <style>
    p { color: white; background-color: #666; padding: 5px; }
  </style>
  <p><slot></slot></p>
</template>

<!-- 使用组件 -->
<my-paragraph>这是要插入到 slot 中的内容</my-paragraph>
```

### 命名 Slots

```html
<!-- Shadow DOM 模板 -->
<template id="named-slots-template">
  <style>...</style>
  <header><slot name="header">默认标题</slot></header>
  <main><slot>默认内容</slot></main>
  <footer><slot name="footer">默认页脚</slot></footer>
</template>

<!-- 使用组件 -->
<custom-element>
  <span slot="header">自定义标题</span>
  <p>这是主要内容（默认插槽）</p>
  <span slot="footer">自定义页脚</span>
</custom-element>
```

## 事件处理

Shadow DOM 中事件的处理与常规 DOM 有一些差异：

1. 大多数事件可以穿过 Shadow DOM 边界冒泡
2. 当事件穿过 Shadow DOM 边界时，其 `target` 会被重新指向 Shadow Host
3. 某些事件不会穿过边界（如 `mouseenter`）

### 侦听事件

```javascript
// 在 Shadow DOM 内部元素上监听事件
shadowRoot.querySelector('button').addEventListener('click', function(event) {
  console.log('Shadow DOM 按钮被点击');
});

// 在宿主元素上监听事件（来自 Shadow DOM 内部的事件）
host.addEventListener('click', function(event) {
  console.log('事件目标:', event.target); // 显示 host 而不是实际被点击的元素
  console.log('组合路径:', event.composedPath()); // 显示完整路径，包括 Shadow DOM 内的元素
});
```

## 组合 Shadow DOM 与自定义元素

Web Components 通常结合使用自定义元素和 Shadow DOM：

```javascript
class MyCustomElement extends HTMLElement {
  constructor() {
    super();
    // 创建 Shadow DOM
    const shadow = this.attachShadow({ mode: 'open' });
    
    // 添加样式和内容
    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 10px;
          border: 1px solid #ccc;
        }
        .container {
          background-color: #f0f0f0;
          padding: 15px;
        }
      </style>
      <div class="container">
        <h2><slot name="title">默认标题</slot></h2>
        <div><slot>默认内容</slot></div>
      </div>
    `;
  }
}

// 注册自定义元素
customElements.define('my-custom-element', MyCustomElement);
```

## 最佳实践

1. **使用开放模式（mode: 'open'）**：除非有特殊需要，通常使用开放模式更方便调试
2. **命名约定**：为自定义元素使用连字符命名（如 `my-element`）
3. **使用 slots 增加灵活性**：通过 slots 允许用户自定义内容
4. **使用 CSS 变量实现主题定制**：允许外部样式化组件
5. **文档化你的组件**：清晰说明组件接收哪些属性、事件和 slots

## 浏览器兼容性

Shadow DOM (v1) 在所有现代浏览器中得到支持：
- Chrome 53+
- Firefox 63+
- Safari 10+
- Edge 79+

## 常见问题与解决方案

### 问题：外部样式不影响 Shadow DOM

**解决方案**：使用 CSS 变量进行样式定制

```css
/* 外部 CSS */
:root {
  --primary-color: blue;
}

/* Shadow DOM 内部 CSS */
p {
  color: var(--primary-color, black); /* 使用变量，默认为黑色 */
}
```

### 问题：第三方库不支持 Shadow DOM

**解决方案**：考虑使用 shadow-piercing 技术或重构为组件架构

### 问题：事件处理复杂性

**解决方案**：使用 event.composedPath() 来访问原始目标，并设置事件的 composed: true 使其能够穿过 Shadow DOM 边界

```javascript
const event = new CustomEvent('my-event', {
  bubbles: true,
  composed: true, // 允许事件穿过 Shadow DOM 边界
  detail: { /* 自定义数据 */ }
});
```

## 结论

Shadow DOM 是创建封装组件的强大工具，它提供了样式隔离和 DOM 封装的能力。结合自定义元素和 HTML 模板，你可以创建可复用、可维护的 Web 组件。 
// DOMContentLoaded的意思是当DOM内容加载完成时，执行回调函数，在js和css加载完成时执行
document.addEventListener('DOMContentLoaded', () => {
    // 示例1: 基本的Shadow DOM封装
    createBasicShadowDOM();
    
    // 示例2: 样式隔离演示
    createStyleIsolationDemo();
    
    // 示例3: 自定义元素与Shadow DOM
    defineCustomCard();
    
    // 示例4: 槽位(Slots)使用演示
    defineFancyButton();
    
    // 示例5: 主题定制演示
    defineThemedComponent();
    setupThemeToggle();
});

// 示例1: 基本的Shadow DOM封装
function createBasicShadowDOM() {
    const host = document.getElementById('basic-host');
    
    // 创建shadow root
    const shadowRoot = host.attachShadow({ mode: 'open' });
    
    // 创建shadow DOM内容
    shadowRoot.innerHTML = `
        <style>
            .shadow-content {
                padding: 10px;
                background-color: #f0f0f0;
                border-radius: 5px;
            }
            
            h3 {
                color: #4a90e2;
            }
        </style>
        <div class="shadow-content">
            <h3>这是Shadow DOM中的内容</h3>
            <p>这段内容被封装在Shadow DOM中，与主文档隔离。</p>
        </div>
    `;
}

// 示例2: 样式隔离演示
function createStyleIsolationDemo() {
    const host = document.getElementById('style-isolation-host');
    
    // 创建shadow root
    const shadowRoot = host.attachShadow({ mode: 'open' });
    
    // 创建shadow DOM内容，注意这里也有一个.red-text类
    shadowRoot.innerHTML = `
        <style>
            .red-text {
                color: blue;
                font-style: italic;
            }
        </style>
        <p class="red-text">这是Shadow DOM中的"红色"文本，但由于样式隔离，它实际上是蓝色的</p>
        <p>Shadow DOM中的样式不会影响外部文档，外部文档的样式也不会影响Shadow DOM内部</p>
    `;
}

// 示例3: 自定义元素与Shadow DOM
function defineCustomCard() {
    class MyCustomCard extends HTMLElement {
        constructor() {
            super();
            const shadowRoot = this.attachShadow({ mode: 'open' });
            
            // 获取属性
            const title = this.getAttribute('title') || '默认标题';
            const imageUrl = this.getAttribute('image') || '';
            const description = this.getAttribute('description') || '暂无描述';
            
            shadowRoot.innerHTML = `
                <style>
                    .card {
                        border-radius: 8px;
                        overflow: hidden;
                        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                        transition: transform 0.3s;
                        max-width: 300px;
                    }
                    
                    .card:hover {
                        transform: translateY(-5px);
                    }
                    
                    .card-img {
                        width: 100%;
                        height: 150px;
                        object-fit: cover;
                    }
                    
                    .card-content {
                        padding: 15px;
                    }
                    
                    .card-title {
                        margin: 0 0 10px 0;
                        color: #333;
                    }
                    
                    .card-description {
                        color: #666;
                        font-size: 14px;
                        line-height: 1.4;
                    }
                </style>
                <div class="card">
                    <img class="card-img" src="${imageUrl}" alt="${title}">
                    <div class="card-content">
                        <h3 class="card-title">${title}</h3>
                        <p class="card-description">${description}</p>
                    </div>
                </div>
            `;
        }
    }
    //customElements 是 Window 对象上的一个只读属性，接口返回一个 CustomElementRegistry 对象的引用，可用于注册新的 custom element，或者获取之前定义过的自定义元素的信息。
    // 注册自定义元素  
    customElements.define('my-custom-card', MyCustomCard);
}

// 示例4: 槽位(Slots)使用演示
function defineFancyButton() {
    class FancyButton extends HTMLElement {
        constructor() {
            super();
            const shadowRoot = this.attachShadow({ mode: 'open' });
            
            shadowRoot.innerHTML = `
                <style>
                    .fancy-btn {
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                        padding: 10px 20px;
                        background: linear-gradient(135deg, #6e8efb, #a777e3);
                        color: white;
                        border: none;
                        border-radius: 50px;
                        font-weight: bold;
                        cursor: pointer;
                        transition: all 0.3s;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    }
                    
                    .fancy-btn:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 20px rgba(0,0,0,0.15);
                    }
                    
                    .icon {
                        font-size: 1.2em;
                    }
                </style>
                <button class="fancy-btn">
                    <span class="icon"><slot name="icon">⚡</slot></span>
                    <slot>按钮</slot>
                </button>
            `;
        }
    }
    
    // 注册自定义元素
    customElements.define('fancy-button', FancyButton);
}

// 示例5: 主题定制演示
function defineThemedComponent() {
    class ThemedComponent extends HTMLElement {
        constructor() {
            super();
            const shadowRoot = this.attachShadow({ mode: 'open' });
            
            shadowRoot.innerHTML = `
                <style>
                    .themed-box {
                        padding: 20px;
                        background-color: var(--theme-bg-color);
                        color: var(--theme-text-color);
                        border-radius: 8px;
                        margin-top: 10px;
                    }
                    
                    .accent-text {
                        color: var(--theme-accent-color);
                        font-weight: bold;
                    }
                </style>
                <div class="themed-box">
                    <h3>主题可定制组件</h3>
                    <p>这个组件使用CSS变量来定制样式，即使在Shadow DOM中也可以从外部更改。</p>
                    <p class="accent-text">这是带有强调色的文本</p>
                </div>
            `;
        }
    }
    
    // 注册自定义元素
    customElements.define('themed-component', ThemedComponent);
}

// 设置主题切换功能
function setupThemeToggle() {
    const toggleBtn = document.getElementById('toggle-theme');
    let isDarkTheme = false;
    
    toggleBtn.addEventListener('click', () => {
        isDarkTheme = !isDarkTheme;
        document.body.classList.toggle('dark-theme', isDarkTheme);
        toggleBtn.textContent = isDarkTheme ? '切换到浅色主题' : '切换到深色主题';
    });
} 
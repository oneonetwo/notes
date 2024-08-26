### 全局状态共享
> https://nuxt.com/docs/api/composables/use-state

1. Nuxt跨页面、跨组件全局状态共享可使用`useState`(支持Server和Client):
    - `useState<T>(init?: () => T|Ref<T>): Ref<T>`
    - `useState<T>(key: string, init?: () => T | Ref<T>): Ref<T>`
    - 参数:
        1. init:为状态提供`初始值的函数`,该函数也支持返回一个`Ref类型`
        2. key:`唯一key`,确保在跨请求获取该数据时,保证数据的唯一性。为的空时会根据文件和行号自动生成唯一key
    - 返回值： Ref响应式对象

2. useState具体使用步骤如下:
    1. 在`composables`目录下创建一个模块,如:`composables/states.ts`
    2. 在states.ts中使用useState定义需全局共享状态,并导出
    3. 在组件中导入states.ts导出的全局状态, 默认自动引入

3. useState注意事项:
    1. useState只能用在`setup函数`和`Lifecycle Hooks`中
    2. useState不支持`classes`,`functions or symbols`类型,因为这些类型不支持


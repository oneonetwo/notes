### vue3基础入门
#### Vue3 + TS 综合案例实践
1. 环境创建
    1. vue+TS开发环境快速创建 `npm create vite@latest 项目名称 -- --template vue-ts` 
    2. vscode的扩展工具
        1. 开发阶段
            > `volar`工具对.vue文件进行实时的类型错误反馈
            > `TypeScript Vue Plugin`工具用于支持在TS中 import *.vue文件
        2. 打包阶段
            > `vuw-tsc`工具负责打包时最终的类型检查
2. ref标注类型 赋值做代码提示，访问时做代码约束
    ```ts
    //1. 简单类型 类型推导
    const count = ref(100);
    const count = 200;
    
    //2. 较复杂的类型  泛型函数
    const year = ref<string | number>('2028');
    year.value = 2020;

    //示例
    type Item = {
        id: string,
        name: string,
        price: number
    }
    const list = ref<Item[]>([]);
    list.value = [{
        id: '1001',
        name: '男士鞋子'，
        price: 200
    }]

    ```
3. reactive标注类型
    1. 类型推导和显式注解
    ```js
    //1. 自动推导
    const form = reactive({
        username: '',
        password: ''
    })
    form.username = '重人'
    //2. 显式注解
    type Form = {
        username: string,
        password: string,
        isAgree?: boolean
    }
    const form: Form = reactive({
        username: '100',
        password: ''
    })
    form.password = '1000';
    from.isAgree = true;
    ```
4. computed标注类型
5. 事件处理函数标注类型
6. 模板引用标准类型
7. 对象的非空值处理
8. 为props标准类型
9. emits标注类型
10. 类型声明文件
11. 环境准备
12. 综合案列-实现频道列表，文章列表，综合和类型优化
13. Pinia-环境搭建和基础使用
14. Pinia-getters和异步action
15. pinia-storeToRefs和调式

#### 项目配置和架构
1. 创建项目
2. 项目配置
3. 配置代码检查工作流
4. 目录调整
5. vue-router初始化
6. 引入vant和移动端适配
7. 主题定制
8. 用户仓库和持久化
9. 基础架构-统一管理
10. 请求工具 
    > 1. axios配置
    > 2. 业务失败处理和摘取核心数据
    > 3. 401处理
    > 4. 工具函数
    > 5. 类型设置

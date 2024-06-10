### vue3基础入门
#### Vue3 + TS 综合案例实践
1. 环境创建
    1. vue+TS开发环境快速创建 `npm create vite@latest 项目名称 -- --template vue-ts` 
    2. vscode的扩展工具
        1. 开发阶段
            > `volar`工具对.vue文件进行实时的类型错误反馈
            > `TypeScript Vue Plugin`工具用于支持在TS中 import *.vue文件
        2. 打包阶段
            > `vue-tsc`工具负责打包时最终的类型检查
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
    1. 自动推导
    ```ts
    const count = ref(0);
    const countDou = computed(()=>count.value*2);
    countDou.value = 1000;
    ```
5. 事件处理函数标注类型
    - 主要做两件事
    1. 给事件对象形参e标注为Event类型，可以获得事件对象的相关类型提示
    2. 更加精确的DOM类型可以使用·断言as·进行操作
    ```js
        const handleClick = (e: Event)=>{
            (e.target as HTMLButtonElement).value
        }
    ```
6. 模板引用标准类型
    - 通过具体的DOM类型联合null作为泛型参数，比如我们想获取一个input dom 元素
    ```js
    const inputRef = ref<HTMLInputElement | null>(null);
    onMounted(()=>{
        inputRef.value?.focus();
    })
    ```
7. 对象的非空值处理
    - 当对象的属性可能是null或者undefined的时候，称之‘空值’
    - 解决方法有三种
    ```
    //1. 可选链 ?.
    inputRef.value?.focus();
    //2. 条件判断
    if(inputRef.value){
        inputRef.value.focus();
    }
    //3. 非空断言   ** 这个特别注意 没有实际的js判断逻辑，只是通过了TS的类型校验，容易出现空值在执行环境。
    inputRef.value!.focus(); 
    ```
8. 为props标准类型
    1. 添加类型注解
    2. props给可选参数设置默认值
    ```ts
    //1. 通过类型别名type定义prop对象类型
    type BtnType = 'success'| 'danger' | 'warn';
    type Props = {
        color: string,
        size?: string,
        btnType?: BtnType
    }
    //2. defineProps<>()泛型传参
    const props = defineProps<Props>();
    //3. 给props设置默认值用默认宏函数 withDefaults
    const props = withDefaults(defineProps<Props>(), {
        size: 'small',
        btnType: 'success'
    })
    ```
9. emits标注类型
    - 触发一个自定义事件，需要关注什么？ 事件名称，事件参数。
    ```ts
    //1. 定义emits类型
    type ListItem = {
        id: number,
        name: string
    }
    type Emits = {
        (e: 'get-msg', msg: string): void,
        (e: 'get-list', list: ListItem[]): void
    }

    //2. 给defineEmits传递泛型参数
    const emit = defineEmits<Emits>();

    const clickHandler = () => {
        emit('get-msg', '100')
    }

    //父组件
    const getMsg = (msg: string)=>{
        console.lgo(msg);
    }
    <Son @get-msg="getMsg" />
    ```
10. 类型声明文件
    1. 在TS中以d.ts为后缀的文件就是类型声明文件，主要作用是为js模块提供类型信息支持，从而获得类型提示。
    2. **TS内置类型声明文件**
        1. ts为js运行时可用的所有标准化内置API都提供了声明文件，不需要编译生成，也不需要第三方提供
            - lib.es5.d.ts, lib.dom.d.ts都是内置的类型声明文件，为原生js和浏览器api提供类型提示。
        2. 想看按住command,点击进入
    3. 用ts编写的库打包编译之后会生成d.ts文件，用于声明类型提示
    4. 有些库不是编写的，不能直接生成配套的d.ts文件，想要类型提示，怎么办？

        - 需要**DefinitelyTyped**提供类型声明文件
        - DefinitelyTyped是一个TS类型定义的仓库，专门为js编写的库可以提供类型声明。比如安装`@type/jquery`为jquery提供类型提示
        ```sh
        npm install jquery
        npm install @type/jquery -D
        ```
    5. 自定义类型声明文件
        - d.ts文件是可以进行自定义创建的，有两个作用 1. **共享TS类型** 2. 给js提供声明类型
        - d.ts文件只有类型信息，只做类型检查。
    ```ts
    //1. 共享ts类型
    export type Goods = {
        id: number,
        name: string
    }

    import type {Goods} from './types/data';
    const good: Goods = {
        id: 1,
        name: '小明'
    }
    //2. 给js文件提供类型
    //index.js 在文件下提供一个 index.d.ts
    //index.js下
    const add = (a. b) => a+ b;
    export { add };
    //index.d.ts
    declare const add = (a: number, b: number)=>number
    export { add };
    //使用
    import { add } from './add/index.js';
    add(1,2) //会有对应的参数类型提示 
    ```
11. 环境准备
12. 综合案列-实现频道列表，文章列表，综合和类型优化
    - 响应式数据ref的类型标注-ref<类型>
    - axios返回数据res.data的类型标注，- axios.request<类型>
    - 类型的定义根据接口文档来做。
    ```js
    //接口数据注解
    type ChannelItem = {
        id: number,
        name: string
    }
    type ChannelsRes = {
        data: ChannelItem[],
        message: string
    }
    const channelList = ref<ChannelItem[]>();
    const getList = async ()=>{
        const res = await axios.request<ChannelsRes>({
            url: '',
        })
        channelList.value = res.data.data.channels;
    }
    //泛型优化 找到可变的地方
    type ResType<T> = {
        message: string,
        data: T
    }
    export type ChannelsRes = ResType<{
        channels: ChannelItem[]
    }>
    ```
13. Pinia-环境搭建和基础使用
    1. https://pinia.vuejs.org/zh/
    2. getters实现 直接使用computed函数进行模拟，然后return
    3. action异步实现
        - 写法和组件中获取异步数据的写法完全一致
    ```js
    //1. 注册
    const pinia = createPinia();
    const app = createApp(App);
    app.use(pinia).mount('#app');
    //2. 创建store
    import {defineStore } from 'pinia';
    import { ref } from 'vue';
    export useCounterStore = defineStore('counter', ()=>{
        const count = ref(0);
        //action 修改数据
        const increment = ()=>{
            count.value++;
        }
        //Pinia-getters 使用computed计算属性模拟
        const doubleCount = computed(()=>count.value*2)

        //以对象的方式return出去供组件使用。
        return {
            count,
            increment,
            doubleCount
        }
    })
    //3. 使用store实例
    const counterStore = useCounterSote();

    //action异步模拟 文章列表
    export useChannelStore = defineStore('channles', ()=>{
        type channelItem = {
            id: number,
            name: string
        }
        type channelsRes = {
            data: {
                channels: channelItem[]
            },
            message: string
        }
        const list = ref<doubleCount[]>([]);
        const getList = async ()=>{
            const res = await axios.request<channelRes>({url:...});
            list.value = res.data.data.channels;
        }
        return {
            list,
            getList
        }
    })
    //使用：
    onmounted(()=>{
        channelStore.getList();
    })
    ```
14. pinia-storeToRefs和调式
    1. 使用`storeToRefs`函数可以辅助保持数据(state+getter)的响应式解构
    2. 直接解构赋值，虽然数据更新，但是页面响应式更新丢失。
    ```ts
    //数据用storeToRefs， 方法还是直接在store中去拿
    const {count, doubleCount} = storeToRefs(counterStore);
    const {getList} = counterStore;
    ```
#### 项目配置和架构
1. 创建项目
    ```sh
    //1
    pnpm create vue 需要Typescript Pinia Router ESlint Prettier
    pnpm install
    pnpm lint //根据设置修复所有代码规范
    pnpm dev
    ```
2. 项目配置
    1. Eslint配置代码风格，配置文件`.eslintrc.cjs`
        1. prettier风格配置https://prettier.io,一定要安装Eslint且配置保存修复，不要开启默认的自动保存格式化。
            - 单引号
            - 不使用分好
            - 宽度80字符
            - 不加对象|数组最后都好
            - 换行符号不限制
        2. vue组件名称多单词组成（忽略index.vue）
        3. props解构（关闭）
        4. 设置之后再跑一次`pnpm lint`修改代码风格
    2. 开启TS托管模式
        1. 安装`Volar`插件 语法高亮，代码提示，支持vue3新特性
        2. 安装`TypeScript Vue Plugin(Volar)(已废弃用vue-official)`,让TS服务知道.vue文件
        3. Take Over Mode托管模式，TS服务性能更好。
            1. 关闭vscode内置的TS服务
            2. 使用Volar提供的TS服务
        4. 怎么开启？
            - 搜索vs内置插件@bulitin ty
            - 出现 TypeScript and Javasript Language插件然后在工作区禁用
3. 配置代码检查工作流
    1. 初始化`husky`配置工具,执行`pnpm dlx husky-init && pnpm install`(执行配置文件，安装husky)
        - 根目录下的.husky
    2. 修改.husky/pre-commit文件，这文件是在git commit之前执行的。
        `去掉npm test 添加pnpm lint来检查` 
    3. 怎么解决？** pnpm lint是全量检查，耗时问题，历史问题**
        - 只做暂存区eslint的校验
        1. 安装lint-staged包`pnpm i lint-staged -D`;
        2. 修改package.json配置lint-staged命令
        3. husky/pre-commit文件修改
        ```
        //1. 修改package
        {
            "scripts": {
                "lint-staged": "lint-staged" //配置命令执行lint-staged
            },
            "lint-staged": { //添加配置，供命令使用
                "*.{js,ts,vue}": [ //检查这些文件
                    "eslint --fix" //eslint尝试修复检查
                ]
            }
        }
        //2. 修改pre-commit
        - pnpm lint
        + pnpm lint-staged
        ```

4. 目录调整./src
    > assets   静态资源，图片
    > components    通用组件   
    > composables  组合功能通用函数
    > icons svg图标
    > router 路由
    > services  接口服务api 
    > stores  状态仓库
    > styles    样式 main.cscs  安装sass预处理器
    > types TS类型
    > utils 工具函数
    > views 页面
    > main.ts   入口文件
    > app.vue   根组件
5. vue-router初始化
    1. 创建路有实力由createRouter实现
    2. 路由模式 createWebHistory() createWebHashHistory();
    3. **import.meta.env.BASE_URL**扩展
        - `import.meta`是Javascript模块暴露描述模块的信息对象
        - env.BASE_URL是Vite环境的配置变量，https://cn.vite.dev;
        - BASE_URL是在vite.config.ts中base选项的配置
    ```js
    import {createRouter, createWebHistroy} from 'vue-router';
    const router = createRouter({
        history: createWebHistroy(import.meta.env.BASE_URL),
        routes: []
    })
    ```
6. 基础架构
    > 构建界面，状态管理，数据交互。
    1. 引入vant和移动端适配
        1. `pnpm i vant`
        2. main.ts中引入样式`import 'vant/lib/index.css'`; 
        3. 使用组件 import {Button as VantButton} from 'vant'; <vant-button/>
    2. 移动端适配 `pnpm i postcss-px-to-viewport -D`
        - 新建postcss.config.js文件， 添加配置
    3. 主题定制
        ```css
        //全局变量
        :root{
            --main-color: red;
        }
        //局部变量
        .footer{
            --footer-color: green;
            --new-color: var(--main-color);
        }
        //使用变量
        .main{
            color: var(--main-color);
        }
        ```
    4. 用户仓库和持久化
        1. 用户信息类型
            > types => user.d.ts
        2. 实现用户仓库,用户状态，设置用户，删除用户
            > stores => user.ts
        3. 进行测试
        4. 持久话 安装`pnpm i pinia-plugin-persistedstate` pinia的插件
            - app.vue注册使用
            - 在仓库添加配置开启持久化
        ```js
        //使用插件
        import persist from 'pinia-plugin-persistedstate';
        app.use(createPinia().use(persist))
        //仓库
        const useUserStore = defineStore('cp-user', ()=>{
            1. 用户状态
            2. 设置用户信息
            3. 删除用户信息
            return {}
        }, {
            persist: true //设置本地持久化
        })

        const store = useUserStore();
        ```
    5. 基础架构-统一管理
        1. **pinia独立维护**
            1. 现在：初始化注册代码在main.ts中，仓库代码在stores中，代码分散智能不单一
            2. 优化：由stores统一维护，在stores/index.ts中完成pinia初始化，插件注册，交付给main.ts直接使用
        2. **仓库统一导出**
            1. 现在：使用一个仓库`import {useUserStore} from '...'`不同仓库路径不一致
            2. 优化： 由store/index统一导出，导入路径统一`./stores`,而且仓库维护在stores/modules中。
    6. 请求工具 -axios配置
        1. axios实例配置
            1. `pnpm i axios`;
            2. `utils => request.ts`
    > 2. 业务失败处理和摘取核心数据
    > 3. 401处理
    > 4. 工具函数
    > 5. 类型设置

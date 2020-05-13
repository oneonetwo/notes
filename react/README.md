# React API

### 一. React基础
#### 1. 代码分割
1. import()  
    > 1. 由于 import() 会返回一个 promise，因此它可以和 async 函数一起使用
    ```javascript   
        //1.使用之前        
            import { add } from './math';
            add(16,26);

        //2.使用之后
            function _add(callback){
                return import(/* webpackChunkName: "mymath" */ './math').then( add => 
                    {
                       return callback(add)
                    })
            }        
            _add((add)=>{
                add(16,26);
            }).then(res=>{
                console.log(res);
            })

        //3.使用async简化后的例子
             function _add(callback){
                const add =  await import(/* webpackChunkName: "mymath" */ './math');
                return callback(add);
            }        
            _add((add)=>{
                add(16,26);
            }).then(res=>{
                console.log(res);
            })
         ```
2. React.lazy
    > 1. lazy接受一个函数，这个函数动态调用`import()`,返回一个Promsie;该 Promise 需要 resolve 一个 defalut export 的 React 组件。
    > 2. 然后应在 Suspense 组件中渲染 lazy 组件，如此使得我们可以使用在等待加载 lazy 组件时做优雅降级（如 loading 指示器等）。
    > 3  基于路由的代码分割 ，能够均匀地分割代码包而不会影响用户体验。
    > 4. 异常捕获边界（Error boundaries），以显示良好的用户体验并管理恢复事宜。
    ```javascript
    // 1. 使用
        import MyErrorBoundary from './MyErrorBoundary';
        import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
        
        const Home = lazy(() => import('./routes/Home'));
        const About = lazy(() => import('./routes/About'));
        function MyComponent(){
            return (
                <div>
                    <MyErrorBoundary>
                        <Router>
                            <Suspense fallback={<div>Loading...</div>}>
                                <Switch>
                                    <Route exact path="/" component={Home}/>
                                    <Route path="/about" component={About}/>
                                </Switch>
                            </Suspense>
                        </Router>
                    </MyErrorBoundary>
                </div>
            )
        } 
    
    ```
3. React.lazy 和 Suspense 技术还不支持服务端渲染。如果你想要在使用服务端渲染的应用中使用，我们推荐 Loadable Components 这个库。它有一个很棒的服务端渲染打包指南。
    ```javascript
        import loadable from '@loadable/component';
        const OtherComponent = loadable(() => import('./OtherComponent'));
        function MyComponent() {
          return (
            <div>
              <OtherComponent />
            </div>
          )
        }
    ```
    
#### 2. [Context](https://react.docschina.org/docs/context.html#dynamic-context)
    - Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据
1. Context
    > 1. React.createContext  创建一个 Context 对象
        - 消费组件只会从组件树离自身最近的 Provider 中读取当前 context 的值
        - 只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。
    > 2. Context.Provider
        - 每个 Context 对象返回一个 Provide React组件，允许消费组件订阅 context 的变化；
        - 当 Provider中的value值发生变化，他内部的所有消费组件都会重新渲染，不受制于 shouldComponentUpdate 函数，因此consumer组件在祖先组件退出更新的情况下也能更新；
        - 通过新旧值来确定变化，使用了`Object.is()`;
    > 3. Class.contextType;
        - 会被重赋值为一个由 React.createContext() 创建的 Context 对象, 让消费组件用 `this.context`消费最近的context的值;
        - 只通过该 API 订阅单一 context;
    > 4. Context.Consumer()
        - 让你在函数式组件中完成订阅 context; 
    > 5. useContext
        - useContext(MyContext) 相当于 class 组件中的 static contextType = MyContext 或者 <MyContext.Consumer>。
        - 接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。
    > 6. [动态 Context](https://react.docschina.org/docs/context.html#dynamic-context);
    > 7. [在嵌套组件中更新Context](https://react.docschina.org/docs/context.html#updating-context-from-a-nested-component)
        - 通过context传递一个函数，使得consumers组件更新context;
    > 8. [消费多个 Context](https://react.docschina.org/docs/context.html#consuming-multiple-contexts)
    ```javascript
    //一个组件可能消费多个context
        function Content(){
            return (
                <ThemeContext.Consumer>
                    { theme => (
                        <UserContext.Consumer>
                            { user=>(
                                <ProfilePage user={user} theme={theme} />           
                            )}
                        </UserContext.Consumer>
                    )}
                </ThemeContext.Consumer>
            )
        }
    //useContext改良
        funciton Content(){
            const theme = useContext(ThemeContext);
            const user = userContext(UserContext);
            return (<ProfilePage user={user} theme={theme} />);
        }
    ```
2. **注意事项**
    > 1. 举个例子，当每一次 Provider 重渲染时，以下的代码会重渲染所有下面的 consumers 组件，因为 value 属性总是被赋值为新的对象：
    ```javascript
        <MyContext.Provider value={{something: 'something'}}>
    ```
    > 2. 为了防止这种情况，将 value 状态提升到父节点的 state 里：
    ```javascript
        <Provider value={this.state.value}>
    ```
3. 使用 Context 之前的考虑
    > 1. 如果你只是想避免层层传递一些属性，组件组合（component composition）有时候是一个比 context 更好的解决方案。
    > 2. 只有最顶部的组件知道如何使用这些属性；
    ```javascript
        function Page(props){
            const user = props.user;
            const content = <Feed user={user} />;
            const topBar = (
                <NavigationBar>
                    <Link href={user.permalink}>
                        <Avatar user={user} size={props.avatarSize} />
                    </Link>
                </NavigationBar>
            );
            return (
                <PageLayout
                  topBar={topBar}
                  content={content}
                />
            );
        }
    ```
    
#### 3. [错误边界（Error Boundaries）](https://react.docschina.org/docs/error-boundaries.html#introducing-error-boundaries)
1. 可以捕获并打印发生在其子组件树任何位置的 JavaScript 错误(render，commit阶段)，并且，它会渲染出备用 UI；
2. 错误边界无法捕获以下场景中产生的错误：
    > 1. 事件处理（了解更多）
    > 2. 异步代码（例如 setTimeout 或 requestAnimationFrame 回调函数）
    > 3. 服务端渲染
    > 4. 它自身抛出来的错误（并非它的子组件
    
#### 4. [Refs](https://react.docschina.org/docs/refs-and-the-dom.html)
1. 使用场景
    > 1. 管理焦点，文本选择或媒体播放。
    > 2. 触发强制动画。
    > 3. 集成第三方 DOM 库。
1. 创建refs,三种方式
    > 1. React.createRef()
        - 创建后，并通过ref 属性附加到React元素，在构造组件时，将refs分配给实例属性，一遍在整个组件中引用；
    > 2. React.useRef()
        - useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数
        - 变更 .current 属性不会引发组件重新渲染
    > 3. 回调Refs
        - 不同于createRef()创建的 ref 属性，你会传递一个函数，函数中接受React组件实例或者dom作为参数，在其他地方存储和访问；
        - React 绑定或解绑 DOM 节点的 ref 时运行某些代码
2. 访问refs
    > 1. `const node = this.myRef.current;` 表示的是底层的dom或者是组件的挂载实例；
    > 2. 你不能在函数组件上中使用ref属性，因为他们没有实例；
    ```javascript
        //createRef
        //dom添加 Ref
        class CustomTextInput  extends Component{
            constructor(props){
                super(props);
                //1. createRef创建
                this.textInput = React.createRef();
                //2. 回调函数
                this.textInput2 = null;
                this.setTextInputRef  = element => {
                    this.textInput2 = element;
                };
            }

            focusTextInput(){
                //通过 "current" 来访问 DOM 节点
                this.textInput.current.focus();
            }

            render(){
                return (
                    <div
                        onClick={this.focusTextInput
                    >
                        <input  type="text" ref={this.textInput} />
                        <input  type="text" ref={this.setTextInputRef} />

                    </div>	


                    )

            }
        }
        //为 class 组件添加 Ref,
        class AutoFocus extends Component{
            constructor(props){
                super(props);
                this.textInput = React.createRef();
            }
            componentDidMount(){
                //使用CustomTextInput组件中focusTextInput();
                this.textInput.current.focusTextInput();
            }
            render (){
                return (
                    <CustomTextInput ref={this.textInput}>
                )
            }
        }
    ```
3. 转发refs
    > 1. 组件间传递回调形式的 refs
    > 2. 组件派发refs
    > 3. 高阶组件中refs转发
    ```javascript
        //组件间传递回调形式的 refs
        function CustomTextInput(props){
            return (
                <div>
                  <input type="text" ref={props.textInput} />
                </div>
            )
        }

        class Parent extends Component{
            render(){
                return (
                    <div>
                        <CustomTextInput textInput={el=> this.inputElement=el}>
                    </div>
                    )
            }
        }
        //组件派发refs
        const  CustomButton = React.forwardRef((props,ref)=>{
            return (
                <button ref = {ref}>
                    { props.children }	
                </button>
            )
        })

        function Parent(){
            const buttonRef = React.createRef();
            return (
                    <CustomButton ref = {buttonRef}>
                        Click me!
                    </CustomButton>
            )

        }

        //高阶组件中refs转发
        function logProps(Component){
            function LogProps(props) {
                const {forwardRef} = props;
                return (
                    <Component {...props} ref={forwardRef} />
                )
            }
            return React.forwardRef((props,ref)=>{
                return (
                    <LogProps {...props} forwardRef={ref}/>
                )
            })
        }
        const CustomButtonHoc = logProps(CustomButton);
        function Parent(){
            const buttonRef = React.createRef();
            return (
                    <CustomButtonHoc ref={buttonRef}>
                        Click me!
                    </CustomButtonHoc>
            )

        }       
    ```
#### 5. [高阶组件](https://react.docschina.org/docs/higher-order-components.html)
1. 特点：
    > 1. 基于React的组合特性实现复用逻辑的色痕迹模式，参数为组件，返回值为新组件的函数。
    > 2. HOC 不会修改传入的组件，也不会使用继承来复制其行为。相反，HOC 通过将组件包装在容器组件中来组成新组件。HOC 是纯函数，没有副作用。
    > 3. 操作props,被包装组件接收来自容器组件的所有 prop，同时也接收一个新的用于 render 的 data prop。
2. 种类及作用
    > 1. 代理方式
        - 操作props
        - 抽取状态
        - 包装组件
    > 2. [继承方式](https://juejin.im/post/5ad7ee045188252e93239dd7)
        - 一般不用
        - 操作生命周期函数是继承方式的高阶组件所特有的功能。这是由于继承方式的高阶组件返回的新组件继承于作为参数传入的组件，两个组件的生命周期是共用的，因此可以重新定义组件的生命周期函数并作用于新组件。而代理方式的高阶组件作为参数输入的组件与输出的组件完全是两个生命周期，因此改变生命周期函数也就无从说起了。
4. connect 是一个返回高阶组件的高阶函数！
5. 务必复制静态方法,Refs 不会被传递,高阶函数命名；    
    ```javascript
        //代理方式
        function Resizable(child){
            return Class extends Componment{
                        constructor(props){
                            super(props)
                            this.state = {
                                size: [window.innerWidth, window.innerHeight];
                            }
                        }
                        let onResize = ()=>{
                            this.setState({
                                size: [window.innerWidth, window.innerHeight];
                            })
                        }
                        componmentDidMount() {
                            window.addEventListener('resize', this.onResize);
                        }
                        componmentWillUnMount(){
                            window.removeEventListener('resize', this.onResize);
                        }
                        render(){
                            const size = {this.state};
                            return <child size={size} {...props}/>
                        }
                    }
        }

        Class Foo extends Componment {
            const { size } = this.props; 
            render (){
                return(
                    <div>
                        {size}
                    </div>
                )
            } 
        }

        const WrapedFpp = Resizable(Foo);


        function withSubscription(WrappedComponent) {
            class WithSubscription extends React.Component {/* ... */}
            //高阶函数命名
            WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
            //复制静态方法
            WithSubscription.staticMethod = WrappedComponent.staticMethod;
            return WithSubscription;
        }
    ```
#### 6. [Render Props](https://react.docschina.org/docs/render-props.html);
1. 概念： 一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术
2. 也是基于React组件组合的方式，我们都知道 prop能传递组件，那么用prop传递一个函数包裹着组件就是渲染属性了。
3. 注意：
    > 1. 将 Render Props 与 React.PureComponent 一起使用时要小心,因为浅比较 props 的时候总会得到 false
    ```javascript
        class Cat extends Component {
            render() {
                const mouse = this.props.mouse;
                return (
                    <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
                );
            }
        }

        class Mouse extends Component {
            constructor(props) {
                super(props);
                this.handleMouseMove = this.handleMouseMove.bind(this);
                this.state = { x: 0, y: 0 };
            }

            handleMouseMove(event) {
                this.setState({
                    x: event.clientX,
                    y: event.clientY
                });
            }
            render() {
                return (
                <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
                    {this.props.render(this.state)}
                </div>
                );
            }
        }

        class MouseTracker extends Component {
          // 定义为实例方法，`this.renderTheCat`始终
          // 当我们在渲染中使用它时，它指的是相同的函数
            renderTheCat(mouse) {
                return <Cat mouse={mouse} />;
            }
            render() {
                return (
                    <div>
                        <h1>移动鼠标!</h1>
                        <Mouse render={this.renderTheCat} />
                    </div>
                );
            }
        }
        export default MouseTracker;
    ```
#### 7. 与第三方库协同
#### 8. 性能优化
#### 9. [Protals](https://react.docschina.org/docs/portals.html)
1. 概念: 将子节点渲染到父节点以外的dom节点的方案
    1. 通过 Portal 进行事件冒泡，尽管 portal 可以被放置在 DOM 树中的任何地方，但在任何其他方面，其行为和普通的 React 子节点行为一致。
2. 用法： `ReactDOM.createPortal(child, container)`
3. 场景：对话框、悬浮卡以及提示框
    ```javascript
        import React,{ useState,useEffect,createPortal} from 'react';
        import ReactDOM  from 'react-dom';
        // 要渲染到的节点
        const modalRoot =document.getElementById('modal')

        function Modal(props){
            let el = document.createElement('div');
            // 仅当 Modal 被插入 DOM 树中才能渲染子元素。
            console.log(props);
            useEffect(() => {
                console.log(modalRoot)
                modalRoot.appendChild(el);
                return ()=>{
                    modalRoot.removeChild(el);
                }
            });

            return ReactDOM.createPortal(
                props.children,
                el
            )
        }

        function Parent(props){
            let [clicks, setClicks] = useState(0);
            return (
                <div onClick={()=>setClicks(clicks+1)}>
                    <p>Number of clicks: {clicks}</p>
                    <p>the onClick handler.</p>
                    <Modal>
                        // 这个按钮的点击事件会冒泡到父元素
                        // 因为这里没有定义 'onClick' 属性
                        <button>click</button>
                    </Modal>
                 </div>
                )
        }

    ```
#### 10. Profiler API
#### 11. 非受控组件
#### 12. Web Components
#### 13. 静态类型检查
- 建议在大型代码库中使用 Flow 或 TypeScript 来代替 PropTypes。
#### 14. 严格模式

***
### 二. React Reference
#### 1. [React.Component](https://react.docschina.org/docs/react-component.html)
- [生命周期速查](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
1. 挂载时
    - 当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下： 
    constructor() => static getDerivedStateFromProps() => render()  => componentDidMount()`
    > 1. constructor(props)
        - 如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数。  
        - 通常，在 React 中，构造函数仅用于以下两种情况：  
            - **避免将 props 的值复制给 state！这是一个常见的错误：**
    ```javascript
        constructor(props) {
            super(props);
            // 不要在这里调用 this.setState()
            this.state = { counter: 0 };
            this.handleClick = this.handleClick.bind(this);
            // 不要这样做
            //this.state = { color: props.color };
        }
    ```
    > 2. componentDidMount() 会在组件挂载后（插入 DOM 树中）立即调用。
    > 3. static getDerivedStateFromProps(props, state)
        - 每次在 Render 之前调用，
        - 让组件在 props 变化时更新 state。
2. 更新时,
    - 当组件的 props 或 state 发生变化时会触发更新:
    ` static getDerivedStateFromProps() => shouldComponentUpdate() => render() => getSnapshotBeforeUpdate() => componentDidUpdate() `
    > 1. shouldCOmponentUpdate(nextProps, nextState)
        - 首次渲染或使用 forceUpdate() 时不会调用该方法。
    > 2. getSnapshotBeforeUpdate(prevProps, prevState)
        - getSnapshotBeforeUpdate() 在最近一次渲染输出（提交到 DOM 节点）之前调用。（例如，滚动位置）。
        - 应返回 snapshot 的值（或 null）。它的返回值将作为 componentDidUpdate() 的第三个参数 “snapshot” 参数传递。
    > 3. componentDidUpdate(prevProps, prevState, snapshot)
        - **componentDidUpdate() 中直接调用 setState()，但请注意它必须被包裹在一个条件语句里**
3. 卸载时，当组件从 DOM 中移除时会调用如下方法：
    > 1. componentWillUnmount()
        
4. 错误处理  Error boundaries  
    - Error boundaries 是 React 组件，它会在其**子组件树**中的任何位置捕获 JavaScript 错误，并记录这些错误，展示降级 UI 而不是崩溃的组件树。
    > 1. static getDerivedStateFromError(error)
        - 此生命周期会在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state
        - getDerivedStateFromError() 会在渲染阶段调用，因此不允许出现副作用。
    > 2. componentDidCatch(error, info)
        - 此生命周期在后代组件抛出错误后被调用。 它接收两个参数：
        - componentDidCatch() 会在“提交”阶段被调用，因此允许执行副作用。
5. 其他的APIs
    > 1. setState()
    > 2. forceUpdate()
        - component.forceUpdate(callback)
        - 调用 forceUpdate() 将致使组件调用 render() 方法，此操作会跳过该组件的 shouldComponentUpdate()。
6. class属性
    > 1. defaultProps
        - defaultProps 可以为 Class 组件添加默认 props。
    > 2. displayName
        - displayName 字符串多用于调试消息。
7. 实例属性
    - props
    - state
#### 2. ReactDOM
#### 3. DOM 元素
#### 4. 合成事件
#### 5. Test Utilities
-  Facebook 内部，我们使用 Jest 来轻松实现 JavaScript 测试。
***

### 三. Hook
#### 
####
####
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
    >> - 消费组件只会从组件树离自身最近的 Provider 中读取当前 context 的值
    >> - 只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。
    > 2. Context.Provider
    >> - 每个 Context 对象返回一个 Provide React组件，允许消费组件订阅 context 的变化；
    >> - 当 Provider中的value值发生变化，他内部的所有消费组件都会重新渲染，不受制于 shouldComponentUpdate 函数，因此consumer组件在祖先组件退出更新的情况下也能更新；
    >> - 通过新旧值来确定变化，使用了`Object.is()`;
    > 3. Class.contextType;
    >> -  会被重赋值为一个由 React.createContext() 创建的 Context 对象, 让消费组件用 `this.context`消费最近的context的值;
    >> - 只通过该 API 订阅单一 context;
    > 4. Context.Consumer()
    >> - 让你在函数式组件中完成订阅 context; 
    > 5. useContext
    >> - useContext(MyContext) 相当于 class 组件中的 static contextType = MyContext 或者 <MyContext.Consumer>。
    >> -  接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。
    > 6. [动态 Context](https://react.docschina.org/docs/context.html#dynamic-context);
    > 7. [在嵌套组件中更新Context](https://react.docschina.org/docs/context.html#updating-context-from-a-nested-component)
    >> -  通过context传递一个函数，使得consumers组件更新context;
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
    >> - 创建后，并通过ref 属性附加到React元素，在构造组件时，将refs分配给实例属性，一遍在整个组件中引用；
    > 2. React.useRef()
    >> - useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数
    >> - 变更 .current 属性不会引发组件重新渲染
    > 3. 回调Refs
    >> - 不同于createRef()创建的 ref 属性，你会传递一个函数，函数中接受React组件实例或者dom作为参数，在其他地方存储和访问；
    >> - React 绑定或解绑 DOM 节点的 ref 时运行某些代码
2. 访问refs
    > 1. `const node = this.myRef.current;` 表示的是底层的dom或者是组件的挂载实例；
    > 2. 你不能在函数组件上中使用ref属性，因为他们没有实例；
    ```javascript
        //useRef 两个例子
        //1. 可变的 ref 对象，其 .current 属性被初始化为传入的参数, 更新current不会发生更新，需要state带动下
        const LikeButton = () => {
            const likeRef = useRef(0);
            function handleAlertClick() {
                setTimeout(() => {
                    alert('you click on' + likeRef.current)
                }, 3000)  
            }
            return <>
                <button onClick={()=>{likeRef.current++}}>
                <button> onClick = { handleAlterClick} </button>
            </>
        }
        // 2. useRef模拟声明周期更新
        const LikeButton = () => {
            const didUpdateRef = useRef(false);
            useEffect(()=>{
                if(didUpdateRef.current){
                    console.log('component is updated');
                } else {
                    didMountRef.current = true;
                }
            })
            return 
            <>
                <button />
            </>
        }
        //createRef 回调函数
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
    >> - 操作props
    >> - 抽取状态
    >> - 包装组件
    > 2. [继承方式](https://juejin.im/post/5ad7ee045188252e93239dd7)
    >> - 一般不用
    >> - 操作生命周期函数是继承方式的高阶组件所特有的功能。这是由于继承方式的高阶组件返回的新组件继承于作为参数传入的组件，两个组件的生命周期是共用的，因此可以重新定义组件的生命周期函数并作用于新组件。而代理方式的高阶组件作为参数输入的组件与输出的组件完全是两个生命周期，因此改变生命周期函数也就无从说起了。
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
6. 为什么用高阶组件代替 Mixins
    > 1. Mixins 引入了无形的依赖,会相互依赖，相互耦合，不利于代码维护
    > 2. 高阶组件是通过将原组件包裹（wrapping）在容器组件（container component）里面的方式来组合（composes）使用原组件。高阶组件就是一个没有副作用的纯函数。
    
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
    >> - 如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数。  
    >> - 通常，在 React 中，构造函数仅用于以下两种情况：  
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
    >> - 每次在 Render 之前调用，
    >> - 让组件在 props 变化时更新 state。
2. 更新时,
    - 当组件的 props 或 state 发生变化时会触发更新:
    ` static getDerivedStateFromProps() => shouldComponentUpdate() => render() => getSnapshotBeforeUpdate() => componentDidUpdate() `
    > 1. shouldCOmponentUpdate(nextProps, nextState)
    >> - 首次渲染或使用 forceUpdate() 时不会调用该方法。
    > 2. getSnapshotBeforeUpdate(prevProps, prevState)
    >> - getSnapshotBeforeUpdate() 在最近一次渲染输出（提交到 DOM 节点）之前调用。（例如，滚动位置）。
    >> - 应返回 snapshot 的值（或 null）。它的返回值将作为 componentDidUpdate() 的第三个参数 “snapshot” 参数传递。
    > 3. componentDidUpdate(prevProps, prevState, snapshot)
    >> -  **componentDidUpdate() 中直接调用 setState()，但请注意它必须被包裹在一个条件语句里**
3. 卸载时，当组件从 DOM 中移除时会调用如下方法：
    > 1. componentWillUnmount()
        
4. 错误处理  Error boundaries  
    - Error boundaries 是 React 组件，它会在其**子组件树**中的任何位置捕获 JavaScript 错误，并记录这些错误，展示降级 UI 而不是崩溃的组件树。
    > 1. static getDerivedStateFromError(error)
    >> - 此生命周期会在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state
    >> - getDerivedStateFromError() 会在渲染阶段调用，因此不允许出现副作用。
    > 2. componentDidCatch(error, info)
    >> - 此生命周期在后代组件抛出错误后被调用。 它接收两个参数：
    >> - componentDidCatch() 会在“提交”阶段被调用，因此允许执行副作用。
5. 其他的APIs
    > 1. setState()
    > 2. forceUpdate()
    >> - component.forceUpdate(callback)
    >> - 调用 forceUpdate() 将致使组件调用 render() 方法，此操作会跳过该组件的 shouldComponentUpdate()。
6. class属性
    > 1. defaultProps
    >> - defaultProps 可以为 Class 组件添加默认 props。
    > 2. displayName
    >> - displayName 字符串多用于调试消息。
7. 实例属性
    - props
    - state
#### 2. ReactDOM
#### 3. DOM 元素
#### 4. 合成事件
1. SyntheticEvent 实例将被传递给你的事件处理函数，它是浏览器的原生事件的跨浏览器包装器。除兼容所有浏览器外，它还拥有和浏览器原生事件相同的接口，包括 stopPropagation() 和 preventDefault()。
2. 当你需要使用浏览器的底层事件时，只需要使用 nativeEvent 属性来获取即可。
3. 以下的事件处理函数在冒泡阶段被触发。如需注册捕获阶段的事件处理函数，则应为事件名添加 Capture。例如，处理捕获阶段的点击事件请使用 onClickCapture，而不是 onClick。
#### 5. Test Utilities
-  Facebook 内部，我们使用 Jest 来轻松实现 JavaScript 测试。
***

### 三. Hook
> 允许我们在函数组件中，使用特定的预定义函数来表示状态和生命周期。
#### 1.为什么引入hooks
1. 类组件的不足
    > 1. 难以复用的状态逻辑
    >> - 缺少复用机制；
    >> - 渲染属性和高阶组件会导致层级冗余臃肿
    > 2. 趋于复杂难以维护
    >> - 生命周期跟不相关的逻辑相互混杂，到处都是对状态的处理，分散不集中，容易出现bug
    > 3. this指向复杂
    >> - 写到内联函数中，过渡创建新句柄，导致子组件过渡渲染；
    >> - 类成员函数会导致this指向不正确。
2. hooks的优势
    > 1. 不用实例化，所有逻辑都在函数内部，没有this指向的问题
    > 2. 预定义的hooks函数可以很方便的把复用的状态逻辑提取出来。
    > 3. 每个useEffect可以只处理一种副作用，逻辑清晰，关注点分离；
3. 常用的API    
    - useState
    > 1. useState 是允许你在 React 函数组件中添加 state 的 Hook。
    > 2. 参数可以是变量或者函数。
    - useEffect
    > 可以在函数组件中执行副作用，表示生命周期的 componentDidMount,componentDidUpdate,componentWillUnmount;
    > 1. effect 可选的清除机制。每个 effect 都可以返回一个清除函数, React 会在组件卸载的时候执行清除操作。
    > 2. 使用多个 Effect 实现关注点分离,解决class生命周期函数经常包含不相关的逻辑；
    > 3. useEffect 会在每次更新默认就会处理。它会在调用一个新的 effect 之前对前一个 effect 进行清理
    > 4. effect的优化    
    >> - 执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[ ]）作为第二个参数。
    >> - 传入 [count] 作为第二个参数，只有count变化事，才会调用effect
    ```javascript
    useEffect(() => {
      document.title = `You clicked ${count} times`;
    }, [count]); // 仅在 count 更改时更新
    ```
    - useContext
    - useCallback
    > 1. 缓存一个函数，这个函数如果是由父组件传递给子组件，或者自定义hooks里面的函数【通常自定义hooks里面的函数，不会依赖于引用它的组件里面的数据】，这时候我们可以考虑缓存这个函数，好处：
    >> - 不用每次重新声明新的函数，避免释放内存、分配内存的计算资源浪费
    >> - 子组件不会因为这个函数的变动重新渲染
    > 2. 把内联回调函数及依赖项数组作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。
    > 3. `useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。`
    - useMemo,
    > 1. 用来缓存数据的，当组件内部某个数据需要依赖特定的state,props通过计算而来，我们就用useMemo来缓存这个数据。以此来避免多次计算造成的浪费，优化性能。
    ```javascript
    import React, { useState, useMemo } from 'react';
    function Info(props) {
      let [personInfo , setPersonInfo] = useState({
        name: 'jingyuan'
        gender: 'male'
      })
      function formatGender(gender) {
        return gender === 'male' ? '男' : '女'
      }
      // 不使用useMemo的情况下，修改其他属性，也会重新调用formatGender方法，浪费计算资源
      // let gender =  formatGender(personalInfo.gender)
      let gender = useMemo(()=>{
        return formatGender(personalInfo.gender)
      },[personalInfo.gender])
      
      return (
        <>
            <div>
              姓名： {personalInfo.name} -- 性别:  { gender } <br/>
            </div>
        </>
      )
    }

    export default Info 
    ```
    - useRef
    - useReducer
    > 1. useState的替代方案，他接受一个形如`(state, action)=>newState`的reducer,返回当前的state以及与其配套的dispatch方法。
    > 2. **跳过 dispatch: 如果 Reducer Hook 的返回值与当前 state 相同，React 将跳过子组件的渲染及副作用的执行。（React 使用 Object.is 比较算法 来比较 state。）**
    > 3. 某些场景下，useReducer会比useState更合适，例如state逻辑较复杂且包含多个子值，或者下一个state以来之前的state。 
    > 4. 编写一个 useReducer 的 Hook，使用 reducer 的方式来管理组件的内部 state 呢？其简化版本可能如下所示：
    ```javascript
    function todosReducer(state, action) {
      switch (action.type) {
        case 'add':
          return [...state, {
            text: action.text,
            completed: false
          }];
        // ... other actions ...
        default:
          return state;
      }
    }
    //reducer 的方式来管理组件的内部 state 呢？其简化版本可能如下所示：
    function useReducer(reducer, initialState){
        const [state, setState] = useState(initialState);
        function dispatch(action){
            const nextState = reducer(state, action);
            setState(nextState);
        }
        return [state, dispatch];
    }   
    //在组件中使用它，让 reducer 驱动它管理 state：
    function Todos(){
        const [todos, dispatch] = useReducer(todosReducer, []);
        function handleChilk(text){
            dispatch({
                type:'add',
                text
            })
        }
    }
    
    
    //计数器  + 惰性初始化
    function init(initialCount){
        return {count: initialCount};
    }

    function reduce(state, action){
        switch (action.type){
            case 'increment':
                return { count: state.count+1 };
            case 'decrement':
                return { count: state: count-1 };
            case 'reset':
                return init(action.payload);
            default:
                throw new Error();
        }
    }

    function Counter({initialCount}){
        const [state, dispatch] = useReducer(reduce, initialCount, init);
        return (
            <>
                <button onClick={() => dispatch({type: 'reset', payload: initialCount})}>
                    Reset
                </button>
                count: {state.count}
                <button onClick={()=>dispatch({type:'decrement'})}> - </button>
                <button onClick={()=>dispatch({type:'increment'})}> + </button>
            </>
            )
    }

    ```
4. 自定义的Hooks
    - 在 React 中有两种流行的方式来共享组件之间的状态逻辑: render props 和高阶组件，现在让我们来看看 Hook 是如何在让你不增加组件的情况下解决相同问题的。
    > 1. 自定义的Hook是一个函数，其名称是以‘use’开头，函数内部可以调用其他的Hook
    > 2. 可以自由的决定它的参数是什么，以及它应该返回什么（如果需要的话）
    > 3. 自定义的Hook必须用‘use’,每次使用hook时，其中的所有state和副作用都是完全隔离的，不会共享；
    > 4. 提取自定义的Hook,使用自定义的Hook
    > 5. 可以创建涵盖各种场景的自定义 Hook，如表单处理、动画、订阅声明、计时器，甚至可能还有其他我们没想到的场景
    ```javascript
    //提取自定义的Hook
    import React, {useState, useEffect} from 'react';
    function useFriendStatus(friendID){
        const [isOnline, setIsOnline] = useState(null);
        useEffect(()=>{
            function handleStatusChange(status){
                setIsOnline(status.isOnline);
            }
            ChatAPI.subscribeToFiendStatus(friendID, handleStatusChange);
        },return ()=>{
            ChatAPI.unsubscribeToFiendStatus(friendID, handleStatusChange);
        });

        return isOnline;
    }

    //使用自定义的Hook
    function FriendStatus(props){
        const isOnline = useFriendStatus(props.friend.id);
        if(isOnline === null){
            return 'Loading...';
        }
        return isOnline? 'online': 'offline';
    }
    ```
    
5. Hooks的使用规则
6. Hooks的常遇见的问题
      

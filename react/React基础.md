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
#### 3. 错误边界
#### 4. Refs 转发
#### 5. 高阶组件
#### 6. Render Props
#### 7. 与第三方库协同
#### 8. 性能优化
#### 9. Protals
#### 10. Profiler API
#### 11. 非受控组件
#### 12. Web Components
#### 13. 静态类型检查
- 建议在大型代码库中使用 Flow 或 TypeScript 来代替 PropTypes。
#### 14. 严格模式

***
### 二. React Reference
#### 1. ReactDOM
#### 2. DOM 元素
#### 3. 合成事件
#### 4. Test Utilities
-  Facebook 内部，我们使用 Jest 来轻松实现 JavaScript 测试。
***

### 三. Hook
#### 
####
####

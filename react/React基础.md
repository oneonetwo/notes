### 一. React基础
#### 1. 代码分割
> 1. import()  
  - 1. 由于 import() 会返回一个 promise，因此它可以和 async 函数一起使用
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
> 2. React.lazy
    1. lazy接受一个函数，这个函数动态调用`import()`,返回一个Promsie;该 Promise 需要 resolve 一个 defalut export 的 React 组件。
    2. 然后应在 Suspense 组件中渲染 lazy 组件，如此使得我们可以使用在等待加载 lazy 组件时做优雅降级（如 loading 指示器等）。
    3  基于路由的代码分割 ，能够均匀地分割代码包而不会影响用户体验。
    4. 异常捕获边界（Error boundaries），以显示良好的用户体验并管理恢复事宜。
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
> 3. React.lazy 和 Suspense 技术还不支持服务端渲染。如果你想要在使用服务端渲染的应用中使用，我们推荐 Loadable Components 这个库。它有一个很棒的服务端渲染打包指南。
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
#### 2. Context
    - Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据
> 1. 使用 Context 之前的考虑
    1. 如果你只是想避免层层传递一些属性，组件组合（component composition）有时候是一个比 context 更好的解决方案。
    2. 只有最顶部的组件知道如何使用这些属性；
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
2. 
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

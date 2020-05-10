# Redux原理·核心API
## CreateStore
1. 这个方法是Redux的核心，将所有的功能连接起来，暴露操作的API供使用
    - 第二个参数是手动指定intialState
    - 第三个参数enhancer只有在使用中间件才会用到，通常情况下我们搭配applyMiddleware来使用，增强dispatch的功能，例如logger,thunk;
2. 调用createStore函数会返回一些操作API，包括：
    - getState: 获取当前的state的值
    - dispatchL （接受action）触发reducer并执行listeners中的每一个方法
    - subscribe: 将监听的方法注册到listeners中，通过dispatch触发
```javascript
export default function createStore(reducer, initialState,enhancer){

    if(typeof initialState === 'function'){
        enhancer = initialStatel
        initialStatel = undefined;
    }

    let state = initialState;
    let listeners = [];
    
    const store = {
        getState(){
            return state;
        },
        dispatch(action){
            if(action&&action.type){
                state = reducer(state, action);
                listeners.forEach(listener => listener());                
            }
        },
        subscribe(listener){
            if(typeof listener === 'function'){
                listeners.push(listener);
            }
        }
    }

    if (typeof initialState === 'undefined') {
        store.dispatch({ type: INIT })
    }

    if (typeof enhancer === 'function') {
        return enhancer(store)
    }
    return store;
}
```
## applyMiddleware
1. 这个方法通过使用中间件增强dispatch的功能。
    - 了解函数的合成compose函数,通过数组的reduce方法，将两个方法合成一个方法，然后用这个合成的方法再去和下一个方法合成，直到结束，这样我们就得到了一个所有方法的合成函数。
    ```javascript
    export function compose(...func){
        if (funcs.length === 1) {
            return funcs[0]
        }

        return funcs.reduce((a, b) => (...args) => a(b(...args)))
    }
    ```
2. 中间件的代码结构,配合中间件的代码结构来帮助理解
    ```javascript
    function middleware (store) {
        return function f1 (dispatch) {
            return function f2 (action) {
                // do something
                dispatch(action)
                // do something
            }
        }
    }
    ```
## 参考
1. https://juejin.im/post/5d1d749ae51d454fa33b1927
2. https://juejin.im/post/5b34acee6fb9a00e60442473

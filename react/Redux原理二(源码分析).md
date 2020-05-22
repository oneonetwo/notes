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
    - 了解[compose合成函数](https://github.com/oneonetwo/notes/blob/master/js/compose%E5%87%BD%E6%95%B0%E5%90%88%E6%88%90.md)，净多一层层改造后得到了新的dispatch方法，这个过程跟Koa的中间件（洋葱模型）原理一样；
    ```javascript
    export default function applyMiddleware(...middlewares){
        return store => {
            const chains = middlewares.map(middleware => middleware(store));
            store.dispatch = compose(...chains)(store.dispatch);
            return store;
        }
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

## combineReducers
1. combineReucers将单个reducer塞到一个对象中，每个reducer对应一个唯一键值，单个reducer状态改变时，对应键值的值也会改变，然后返回整个state。
    ```javascript
    //简易版
    function combineReducers(reducers){
        return function reducer(state, action) {
            const changed = {}
            for(let key in reducers){
                changed[key] = reducers[key](state[key], action);
            }
            return {
                ...state,
                ...changed
            }
        }
    }
    ```

## bindActionCreators
1. 这个方法就是将我们的action和dispatch连接起来，它返回一个方法集合，直接调用来触发dispatch。
    ```javascript
    //简易版
    function bindActionCreators(actionCreators, dispatch) {
        const ret = {}

        for(let key in actionCreators) {
            ret[key] = function(...args) {
                const actionCreator = actionCreators[key]
                const action = actionCreator(...args)
                dispatch(action)
            }
        }

        return ret
    }
    ```

## 中间件thunk 中间件是有执行顺序的
1. 让dispatch接受函数的功能
    ```javascript
    function thunk({getState}){
        //next相当于dispatch
        return next => action => {
            if(typeof action === 'function'){
                //如果action是函数，那么把next函数放到下个next中
                action(next, getState);
            }else{
                next(action)
            }
        }
    }
    ```



## 参考
1. https://juejin.im/post/5d1d749ae51d454fa33b1927
2. https://juejin.im/post/5b34acee6fb9a00e60442473

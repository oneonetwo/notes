# Redux原理·核心API
## CreateStore
1. 这个方法是Redux的核心，将所有的功能连接起来，暴露操作的API供使用
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


## 参考
1. https://juejin.im/post/5d1d749ae51d454fa33b1927
2. https://juejin.im/post/5b34acee6fb9a00e60442473

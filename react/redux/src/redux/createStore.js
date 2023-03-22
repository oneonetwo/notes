/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-03-21 11:50:58
 * @LastEditors: jy
 * @LastEditTime: 2023-03-22 14:04:07
 */
function createStore(reducer, preloadedState, enhancer){
    if(typeof enhancer!=='undefined'){
        return enhancer(createStore)(reducer, preloadedState);
    }
    let state = preloadedState;
    let listeners = [];
    function getState(){
        return state;
    }
    function dispatch(action){
        state = reducer(state, action);
        listeners.forEach(ln=>ln());
    }
    //注册事件
    function subscribe(listener){
        listeners.push(listener);
        return ()=>{
            listeners = listeners.filter(ln=>ln!=listener);
        }
    }
    //初始化state的值
    dispatch({type:'@@redux/action'})
    return {
        getState,
        dispatch,
        subscribe
    }
}

export default createStore;
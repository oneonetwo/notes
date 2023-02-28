/**
 * 增加一个变化监听函数。它将在任何派发动作的时候被调用
 * 状态树的部分数据可能会发生潜在的变化。你可能在那个时候在回调函数中调用getState方法以获取最新的状态。
 * 你可能会在监听函数里调用dispatch方法，它会具备以下注意事项
 * 1. 订阅仅仅在每一次调用每一个dispatch方法时被记录快照
 * 如果你在监听函数被触发的时候订阅或取消订阅的话，这对当前正在处理中的dispatch没有任何效果
 * 尽管如此，在下一次dispatch方法的调用中，不管是不是内嵌，都将使用一个最新的订阅列表
 * 
 * 2.监听函数不应该预期所有的状态变化，因为状态可能在dispatch中被更新多次。 尽管如此，在 dispatch之前注册的订阅者将会以最新的状态调用
 * 
 * @param {*} listener  每一次dispatch时被调用的监听函数
 * @returns {Function} 返回一个可以移除此监听函数的函数
 */

/**
 * 派发一个动作，这是触发状态改变的唯一方式
 * 用来创建仓库的reducer函数将会被调用，参数是当前的状态树和给定的动作。它的返回值将会被当作下一个状态树，所有的监听函数也会被通知
 * 
 * 基本实现中只支持简单动作对象。如果你想要派发一个Promise、一个Observerable、一个thunk或者其它的任何懂爱，你需要把你创建仓库的函数包裹到对应的中间件里。
 * 比如，你可以看一下redux-thunk包。甚至中间件最后通过这个方法将会派发简单对象。
 * 
 * 
 * @param {*} action 一个表示发生了什么的简单对象。保持动作序列化将会是一个好主意，以方便你进行记录和回放用户会话。或者使用时间旅行工具redux-devtools.一个动作必须有一个type属性而且不能是undefine.使用字符串常量表示动作类型将会是个好主意。
 * @returns {object} 为了方便，你派发的相同的动作对象
 * 请注意，如果你使用一个自定义中间件，你可能需要包裹 dispatch去返回别的东西(比如你等待的Promise)
 */

function createStore(reducer, preloadedState, enhancer){
    //中间件
    if(enhancer){
        return enhancer(createStore)(reducer, preloadedState);
    }
    let state = preloadedState;
    let listeners: Function[] = [];
    function getState(){
        return state;
    }
    function subscribe(listener){
        listeners.push(listener);
        return function(){
            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        }
    }
    function dispatch(action){
        state = reducer(state, action);
        listeners.forEach(listener=>listener())
    }
    dispatch({type: '@redux/INIT'})

    return {
        getState,
        dispatch,
        subscribe,
    }   
}
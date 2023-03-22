
/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-03-22 11:13:02
 * @LastEditors: jy
 * @LastEditTime: 2023-03-22 13:51:44
 */

import { compose } from "./index";

function applyMiddleware_1(logger){
    return function(createStore){
        return  function(combinedReducer){
            let store = createStore(combinedReducer);
            //重写dispatch
            let dispatch;
            let middleAPI = {
                getState: store.getState,
                dispatch: actions=>dispatch(actions)
            } 
            dispatch = logger(middleAPI)(store.dispatch);
            return {
                ...store,
                dispatch
            }
        }
    }
}

//加入compose
function applyMiddleware(...middlewares){
    return function(createStore){
        return  function(combinedReducer, preloadedState){
            let store = createStore(combinedReducer, preloadedState);
            //重写dispatch
            let dispatch;
            let middleAPI = {
                getState: store.getState,
                dispatch: actions=>dispatch(actions)
            } 
            let chain = middlewares.map(middleware=>middleware(middleAPI));
            console.log('chain', chain);
            dispatch = compose(...chain)(store.dispatch);
            return {
                ...store,
                dispatch
            }
        }
    }
}
export default applyMiddleware;
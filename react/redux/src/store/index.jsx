import { createStore, applyMiddleware } from "../redux";

import logger from "./logger";
import promiser from "./promiser";
import combinedReducer from "./reducers";
import thunk from "./thunk";


//中间件示例
// let store = createStore(combinedReducer);
// let dispatch = store.dispatch;
// store.dispatch = function(action){
//     console.log('prev state', store.getState());
//     dispatch(action);
//     console.log('next state', store.getState());
// }



//如果配置了多个中间件，多个中间件会进行级联 promise next=>thunk next=>logger next->store.dispatch
//let store = applyMiddleware(thunk, promise, logger)(createStore)(combinedReducer,initialState);
let initialState = {
    counter1: {number: 10},
    counter2: {number: 20}
}
let store = createStore(combinedReducer, initialState, applyMiddleware(promiser, thunk, logger),);
export default store;
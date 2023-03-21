/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-03-21 14:32:21
 * @LastEditors: jy
 * @LastEditTime: 2023-03-21 18:40:56
 */
function combineReducer(reducers){

    return function(state={}, action){
        let nextState = {};
        for(let key in reducers){
            nextState[key] = reducers[key](state[key], action);
        }
        return nextState;
    }
}

export default combineReducer;
import React, { useLayoutEffect, useState } from "react";
import { useContext } from "react"
import ReactReduxContext from "../react-context";

/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-03-22 09:21:27
 * @LastEditors: jy
 * @LastEditTime: 2023-03-22 10:14:29
 */

function useSelectorWithStore(selector,store){
    let {subscribe,getState} = store;
    const [, forceUpdate] = React.useReducer(x => x + 1, 0);
    let state = getState();
    let selectedState = selector(state);
    React.useLayoutEffect(() => {
        //其实这个订阅只会执行一次就可以了
        return subscribe(forceUpdate);
    }, [subscribe]);
    return selectedState;
}

const useSelector = function(selector){
    const store = React.useContext(ReactReduxContext);
    const selectedState = useSelectorWithStore(selector,store);
    return selectedState;
}

export default useSelector;
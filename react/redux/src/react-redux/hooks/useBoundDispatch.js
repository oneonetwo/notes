/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-03-22 09:44:26
 * @LastEditors: jy
 * @LastEditTime: 2023-03-22 10:16:57
 */
/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-03-22 09:21:10
 * @LastEditors: jy
 * @LastEditTime: 2023-03-22 09:36:09
 */
import React, { useContext }from "react";
import { bindActionCreators } from "../../redux";
import ReactReduxContext from "../react-context";


function useBoundDispatch(actions){
    let store = useContext(ReactReduxContext);
    let dispatch =  store.dispatch;
    let boundActions = bindActionCreators(actions, dispatch);
    return boundActions;
}

export default useBoundDispatch;
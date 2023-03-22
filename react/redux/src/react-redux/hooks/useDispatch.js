/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-03-22 09:21:10
 * @LastEditors: jy
 * @LastEditTime: 2023-03-22 09:36:09
 */
import React, { useContext }from "react";
import ReactReduxContext from "../react-context";


function useDispatch(){
    let store = useContext(ReactReduxContext);
    return  store.dispatch;
}

export default useDispatch;
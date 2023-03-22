/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-03-21 17:20:55
 * @LastEditors: jy
 * @LastEditTime: 2023-03-22 10:15:30
 */
import { useEffect, useState } from "react";
import { connect, useBoundDispatch, useDispatch, useSelector } from '../react-redux';
import actions from '../store/actions/counter1';


const CounterHook = props => {
    let {number} = useSelector(state=>state.counter1);
    let boundActions = useBoundDispatch(actions);

    // let dispatch = useDispatch();
    // let boundActions = bindActionCreators(actions, dispatch);
    return <div>
        <div id="counter">{ number }</div>
        <br />
        <button id="add" onClick={boundActions.add1}>加</button>
        <button id="minus" onClick={boundActions.minus1}>减</button>
    </div>
}


export default CounterHook;

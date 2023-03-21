import { useEffect, useState } from "react";
import { bindActionCreators } from "../redux";
import store from "../store";
import { ADD1, MINUS1 } from "../store/action-types";

/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-03-21 11:03:54
 * @LastEditors: jy
 * @LastEditTime: 2023-03-21 16:48:06
 */
function add (){
    return { type: ADD1 };
}
function minus (){
    return { type: MINUS1 };
}
let actions = {add, minus};
let bindActions = bindActionCreators(actions, store.dispatch);

const Counter = props => {
    let [number, setNumber] = useState();

    useEffect(()=>{
        let listener = store.subscribe(()=>{
            setNumber(store.getState()['counter1']['number']);
        })
        return ()=>{
            //销毁注册事件
            listener();
        }
    }, [])
    const handleAdd = ()=>{
        bindActions.add();
    }
    const handleSub = ()=>{
        bindActions.minus();
    }
    return <div>
        <div id="counter">{ number }</div>
        <br />
        <button id="add" onClick={handleAdd}>加</button>
        <button id="minus" onClick={handleSub}>减</button>
    </div>
}

export default Counter;

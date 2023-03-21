/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-03-21 14:03:58
 * @LastEditors: jy
 * @LastEditTime: 2023-03-21 14:04:02
 */
import { useEffect, useState } from "react";
import store from "../store";

/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-03-21 11:03:54
 * @LastEditors: jy
 * @LastEditTime: 2023-03-21 11:12:03
 */

const Counter = props => {
    let [number, setNumber] = useState(store.getState);

    useEffect(()=>{
        let listener = store.subscribe(()=>{
            setNumber(store.getState());
        })
        return ()=>{
            //销毁注册事件
            listener();
        }
    }, [])
    const handleAdd = ()=>{
        store.dispatch({type: 'add'});
    }
    const handleSub = ()=>{
        store.dispatch({type: 'minus'});
    }
    return <div>
        <div id="counter">{number}</div>
        <br />
        <button id="add" onClick={handleAdd}>加</button>
        <button id="minus" onClick={handleSub}>减</button>
    </div>
}

export default Counter;

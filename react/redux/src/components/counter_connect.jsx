/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-03-21 17:20:55
 * @LastEditors: jy
 * @LastEditTime: 2023-03-21 18:26:34
 */
import { useEffect, useState } from "react";
import { connect } from './react-redux';
import actions from '../store/actions/counter1';

const Counter = props => {
    return <div>
        <div id="counter">{ props.number }</div>
        <br />
        <button id="add" onClick={props.add1}>加</button>
        <button id="minus" onClick={props.minus1}>减</button>
    </div>
}
//mapStateToProps 把状态映射出来一个新的状态， state.counter1将会成为组件Counter的props属性
//mapDispatchProps 经过绑定后也会成为Counter的props的属性。
//Counter.props = { ...state.counter1, ...bindActions };

let mapStateToProps = (state)=>{
    return state.counter1;
};
let mapDispatchProps = actions;
// let mapDispatchProps=()=>{};
export default connect(
    mapStateToProps,
    mapDispatchProps,
)(Counter);
//1. 输入 从仓库的状态中取数据，在组件中显示。
//2. 输出 可以在组件中派发动作，修改仓库中的状态。

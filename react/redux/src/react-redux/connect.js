import React, { Component, useContext, useLayoutEffect, useReducer } from "react";
import { useMemo } from "react";

import { bindActionCreators } from "../redux";
import ReactReduxContext from "./react-context";


/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-03-21 18:19:38
 * @LastEditors: jy
 * @LastEditTime: 2023-03-21 20:16:00
 */

//类高阶函数的实现 
const connect = function(mapStateToProps, mapDispatchToProps){
    return  OldComponent => {
        return class extends Component{
            static contextType = ReactReduxContext;
            constructor(props, context){
                super(props);
                let { getState, dispatch, subscribe} = context;
                //huoqu state
                this.state = mapStateToProps(getState());

                this.unsubscribe = subscribe(() => {
                    this.setState(mapStateToProps(getState()));
                });
                

                let dispatchProps =  { dispatch };
                if(typeof mapDispatchToProps === 'function'){
                    //如果是个函数
                    dispatchProps = mapDispatchToProps(dispatch);
                }else if(typeof mapDispatchToProps==='object'){
                    // mapDispatchToProps如果是个对象，那么是个actions
                    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
                }
                this.dispatchProps = dispatchProps;
            }
            componentWillUnmount() {
                this.unsubscribe();
            }
            render(){
               
                return <OldComponent{...this.props} {...this.state} {...this.dispatchProps}/>
            }
        }
    }

}
// 函数组件的实现
const connect2 = (mapStateToProps, mapDispatchToProps)=>{
    return OldComponent => {
        return props=>{
            let value = useContext(ReactReduxContext);
            let {getState, dispatch, subscribe} = value;
            const prevState = getState();
           //forceUpdate模拟的类组件的强制刷新方法
            let [, forceUpdate] = useReducer(s=>s+1, 0);
            //添加注册，如果状态改变，则触发更新
            useLayoutEffect(()=>{
                let listener = subscribe(forceUpdate);
                return listener;
            }, [subscribe])


            let statePropsMemo =  useMemo(()=>{
                return mapStateToProps(prevState);
            }, [prevState]) 

            let dispatchPropsMemo = useMemo(()=>{
                 let dispatchProps =  { dispatch };
                if(typeof mapDispatchToProps === 'function'){
                    //如果是个函数
                    dispatchProps = mapDispatchToProps(dispatch);
                }else if(typeof mapDispatchToProps==='object'){
                    // mapDispatchToProps如果是个对象，那么是个actions
                    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
                }
                return dispatchProps;
            }, [dispatch])
            console.log('dispatchPropsMemo', getState());
            return <OldComponent {...props} {...statePropsMemo} {...dispatchPropsMemo}/>
        }
    }
}
export default connect;
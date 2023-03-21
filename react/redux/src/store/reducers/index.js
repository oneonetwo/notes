/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-03-21 16:13:44
 * @LastEditors: jy
 * @LastEditTime: 2023-03-21 16:44:17
 */
import { combineReducer } from '../../redux';
import counter1 from './counter1';
import counter2 from './counter2';
/* 
let combinedState = {
    counter1:{number:0},
    counter2:{number:0}
}
*/
let reducers = combineReducer({counter1, counter2});
export default reducers;
/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-03-24 15:18:06
 * @LastEditors: jy
 * @LastEditTime: 2023-03-24 15:18:09
 */
import React from 'react';
import ReactDOM from "react-dom/client";

function readonly(target, key, descriptor){
    descriptor.writable = false;
}
class Circlr{
    @readonly PI = 3.14
}

let c = new Circlr();
c.PI = 555;
console.log(c);


const App = props=>{
    return <div>hello</div>
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


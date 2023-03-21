/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-03-21 17:13:33
 * @LastEditors: jy
 * @LastEditTime: 2023-03-21 17:13:36
 */
import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "./redux";
import Counter1 from "./components/counter1";
import Counter2 from "./components/counter2";

function App() {
    
	return (
		<>
			<Counter1/>
			<Counter2/>
		</>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

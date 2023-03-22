/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-03-22 09:31:42
 * @LastEditors: jy
 * @LastEditTime: 2023-03-22 09:31:46
 */
import React from "react";
import ReactDOM from "react-dom/client";
import Counter from "./components/counter_connect";



import { Provider } from "./react-redux";
import store from "./store";


function App() {
    
	return (
		<Provider store={store}>
			<Counter/>
		</Provider>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

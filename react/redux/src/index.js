import React from "react";
import ReactDOM from "react-dom/client";
import CounterMiddleware from "./components/counter_middleware";



import { Provider } from "./react-redux";
import store from "./store";


function App() {
    
	return (
		<Provider store={store}>
			<CounterMiddleware/>
		</Provider>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

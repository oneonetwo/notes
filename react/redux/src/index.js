import React from "react";
import ReactDOM from "react-dom/client";
import CounterHook from "./components/counter_hook";



import { Provider } from "./react-redux";
import store from "./store";


function App() {
    
	return (
		<Provider store={store}>
			<CounterHook/>
		</Provider>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

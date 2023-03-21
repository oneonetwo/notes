import React from "react";
import ReactDOM from "react-dom/client";
import Counter from "./components/counter_connect";



import { Provider } from "./components/react-redux";
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

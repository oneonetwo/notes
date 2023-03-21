import { createStore } from "../redux";
import combinedReducer from "./reducers";


let store = createStore(combinedReducer);

export default store;
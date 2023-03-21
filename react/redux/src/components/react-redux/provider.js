import store from "../../store"
import ReactReduxContext from "./react-context"

const Provider = props=> {
    return <ReactReduxContext.Provider value={props.store}>
        {props.children}
    </ReactReduxContext.Provider>
}

export default Provider;
import React, {memo, useState} from "react";

const App = memo(()=>{
    const [count, setCount] = useState(0)
    const handleClick = ()=>{
        setCount(count+1)
    }
    return <div>
        <button onClick={handleClick}>count+1</button>
        <h1>App Count: {count}</h1>
    </div>
})

export default App
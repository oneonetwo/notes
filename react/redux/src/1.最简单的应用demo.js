import { createStore } from "./redux";

let couterValue = document.getElementById('counter');
let addbtn = document.getElementById('add');
let subbtn = document.getElementById('minus');

function reducer(state = 0, action){
    let { type } = action;
    switch (type){
        case 'add':
            state +=1;
            break;
        case 'minus':
            state -=1;
            break;
        case 'default':
            break;
        } 
    return state;
}
let store = createStore(reducer);
store.subscribe(listener);

function listener(){
    console.log('couterValue', couterValue);
    couterValue.innerHTML = store.getState();
}
addbtn.addEventListener('click', function(){
    store.dispatch({type: 'add'});   
})

subbtn.addEventListener('click', function(){
    store.dispatch({type: 'minus'});   
})
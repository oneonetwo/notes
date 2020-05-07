# Redux的原理

## 设计思想
  1. Redux的设计思想很简单，就两句话：
      - web 用用是一个状态机，视图和状态是一一对应的；
      - 所有的状态，都保存在对象里面； 
## 基本用法
  1. Store 保存数据的地方，
      - 使用 `createStore` 来生成Store
      ```javascript 
      import { createStore } from 'redux';
      const store = createStore(fn);
      ```
  2. State 
      - Store对象包含所有的数据，如果想得到某一个时点的数据，就要对Store生成快照，这个时点的数据集合，就叫做State;
      - 当前时刻的State，可以用store.getState() 拿到；
      - Redux规定，一个State对应一个View，只要State相同，View就相同；
      ```javascript
      const state = store.getState();
      ```
  3. Action
      - Action是一个对象，其中Type对象是必须的表示Action的名称，其他的属性可以自由的设置；
      - Action描述当前发生的事情，改变State唯一的办法，就是使用Action；
  4. Action Creator
      - 可以用函数生成一个action，这个函数就是action create;
      ```javascript
      const ADD_TODO = "ADDDOTO";
      
      function addTodo( text ) {
          return {
              type: ADD_TODO,
              text
          }
      }
      const action = addTodo('Learn Redux');
      ```
  5. store.dispatch()
      - store.dispatch 是View发出Action的唯一的方法。
      - store.dispatch 接受一个Action对象作为参数，将它发送出去。
      ```javascript
      store.dispatch(action);
      ```
  6. Reducer
      - Reducer是一个函数，接受Action和当前的State作为参数，返回一个新的State。
      ```javascript
      const defaultState = 0;
      const reducer = (state = defaultState, action) => {
        switch (action.type) {
          case 'ADD':
            return state + action.payload;
          default: 
            return state;
        }
      };

      const state = reducer(1, {
        type: 'ADD',
        payload: 2
      });
      ```
    

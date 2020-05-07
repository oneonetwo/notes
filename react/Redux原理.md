# Redux的原理

## 设计思想以及流程
  1. Redux的设计思想很简单，就两句话：
      - web 用用是一个状态机，视图和状态是一一对应的；
      - 所有的状态，都保存在对象里面；
  2. 首先用户发出Action，`dispatch(action)`,然后store 自动调用reducer，传入两个参数，当前的state和收到的Action，Rducer返回新的State;
  State一旦有变化，Store就会调用监听函数，subscribe(listener); listener可以通过store.getState()得到当前的状态，并触发重新渲染
  ```javascript
  function listerner() {
    let newState = store.getState();
    component.setState(newState);   
  }
  ```
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
  7. 纯函数
      - Reducer函数最重要的特征就是他是一个纯函数，只要是同样的输入，必定得到同样的输出。
        1. 纯函数式函数式变成的概念，必须遵守以下约束。
            - 不得改写参数，
            - 不能调用系统I/O的API
            - 不能调用Date.now()或者Math.random()等不纯的犯法，因为每次会得到不一样的结果。
      - 由于Reducer函数里面不能改变State,必须返回一个全新的对象
      ```javascript
      // State 是一个对象
      function reducer(state, action) {
        return Object.assign({}, state, { thingToChange });
        // 或者
        return { ...state, ...newState };
      }

      // State 是一个数组
      function reducer(state, action) {
        return [...state, newItem];
      }
      ```
  8. store.subscribe()
      - Store允许使用store.subscribe方法设置监听函数，一旦State发生变化，就自动执行这个函数。
      ```javascript
      store.subscribe(listener);
      ```
      - 只要把View的更新函数（react组件的render或者setState方法）放入listen，就能实现View的自动渲染；
      - store.subscribe方法返回一个函数，调用这个函数就可以解除监听；
      ```javascript
      let unsubscribe = store.subscribe(()=>console.log(store.getState()));
      unsubscript();
      ```
  9. Reducer 的拆分
      - Reducter负责生成State对象，
      - Redux 提供了一个combineReducers方法，用于 Reducer 的拆分。只要定义了各个子Reducer函数，然后用这个方法，将他们合成一个大的Reducer
      
      
    

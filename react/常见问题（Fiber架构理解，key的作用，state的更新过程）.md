## React构架设计原理
1. createElement
    - babel转译jsx,每个节点调用createElement函数，createElement返回包含type, props,[children]的js对象。
2. scheduler任务调度 -`确定react何时进行更新渲染工作`
    - requestIdleCallback 是捡浏览器空闲来执行任务。循环调用performUnitOfWork函数，performUnitOfwork主要就是构建fiber树（深度优先），返回下一个nextUnitOfWork,
      > - React不使用requestIdleCallback,requestIdleCallback这个 API 目前还处于草案阶段，所以浏览器实现率还不高，所以在这里 React 直接使用了polyfill的方案。这个方案简单来说是通过requestAnimationFrame在浏览器渲染一帧之前做一些处理，然后通过postMessage在macro task（类似 setTimeout）中加入一个回调，在因为接下去会进入浏览器渲染阶段，所以主线程是被 block 住的，等到渲染完了然后回来清空macro task。总体上跟requestIdleCallback差不多，等到主线程有空的时候回来调用;
    - 页面是一帧一帧绘制出来的，当每秒绘制的帧数（FPS）达到 60 时，页面是流畅的，小于这个值时，用户会感觉到卡顿。
      > - 浏览器完成高优先级处理后，如果没超过16ms说明时间是富余的，就会执行requestIdleCallback里面注册的任务，requestIdleCallback的回调函数接收dealine作为入参，deadline包含diditimeout，timeRemaining两个属性，
    - 为了保持不会阻碍主线程太长时间，以及能及时处理用户输入，保持动画流畅 react用了调度，把工作分解成多个小单元，在完成每个小单元后，如果需要执行其他的操作，我们就让浏览器中断渲染。这个小单元就是nextUnitOfWork
    - performUnitOfWork方法，做三件事
      > 1. 添加元素到dom属性
      > 2. 为元素的children创建fiber
      > 3. 选择下一个next unit of work，并return
      >> - 当我们完成 performing 中的fiber时，如果有child则作为下一个fiber(工作单元),如果没有孩子则找sibling作为下一个工作单元，如果没有child也没sibling，则找parent的sibling也就是叔叔，
      >> - 找fiber的过程，使用深度优先
  
3. reconciliation 协调是vdom的真正实现 `比较两棵树之间的不同，确定需要更新的地方；`
    - reconcileChildren目的是创建fiber,然后对比新旧节点，看effectTag属性是更新还是创建，还是删除。
    - **key的作用** 调和单个节点，调和列表数组
      > 1. 调和单个节点
      >> - 如果key和节点类型都相等则直接复用，如果key为null我们也认为是相等的
      > 2. 调和数组
      >> - 设置newIndex,开始遍历新的children，对比oldFiber相同的index的key是否相等，如果相等，则复用节点，继续遍历，nextoldFiber = oldFiber.silbing;如果不相等则return null,结束第一次循环，
      >> - 如果newIndex小于数组长度，则说明新的元素有新增或者变换了位置，创建existingChildren(存放剩余oldfiber)的map,从当前newIndex开始第二次循环，根据key在map里面找，如果有并且type相同则复用。
      > 3. key的作用主要就是复用之前的节点的，没有key的话，数组就要每次全部删除然后重新创建，开销就非常大
      
4. commitRoot
    - 等nextUnitOfWork没有了，则表示fiber树构建完成，那么调用commitRoot函数，遍历fiberRoot，把整个fiber添加到Dom

## state的更新过程（异步，同步的问题）
1. 前提,我们知道调用 setState, render, forceUpdate会进入调度执行渲染操作。当更新渲染时：
    > 1. 调用 sheduleUpdate函数
    >> - 1.创建update对象
    >>> - 用于记录组件状态改变,链表上的一个节点 ，多个Update可以同时存在  比如 三个setState更新后，创建三个Update对象，存放在UpdateQueue队列中(单项链表)，在做一次总体的更新。
    >>> 1. 属性有 payload: setState传进来的值，
    >>> 2. next下个（setState）update对象,
    >>> 3. callback setState中的回调 
    >>> 4. expirationtime过期的时间，不同的任务执行不同的种类的exp
    
    >> - 2.调用enqueueUpdate把update添加到 updateQueue（单项链表）
    >>> - updateQueue对象，挂在每个Fiber，状态更新的队列。
    >>> 1. baseState： state最终更新的结果
    >>> 2. firstUpdate: 队列中的第一个update
    >>> 3. lastUpdate
    
    >> - 3.调用scheduleWork函数，告诉调度中心我们有更新。
    
    > 2. 进入requestWork(root, expirationtime)函数 
    >> - isBatchUpdates = true;
    >> - performSyncWork

2. 现象
    > 1. 我们直接在setState之后使用state,那么时异步的，如果在setTimeout和dom事件中使用state是同步的
    > 2. 如果时对象形式的设置多个setState，则会进行浅合并（Object.assign）,函数当然不会。
   
3. 总结
    > 1. batchedUpdate调用回调函数方法并返回，等三次setState都调用完成把三个update对象都加到updateQueue之后才会进行调度performSyncWork函数，进行更新。
    > 2. 等setTimeOut和自己添加的事件执行时，函数的执行栈都变了，isBatchUpdate都没有为true的情况了。所以每次调用setState之后都会进行更新，所以每次打印都是新的state,同时这样子也会导致我们应用的性能变低。
    > 3. React自身的机制比如生命周期，react中注册的事件都是符合batchedUpdate机制的。


二．	React构架原理详解
a)	渲染过程
i.	createElement  babel转译jsx,每个dom元素再有createElement创建树形结构的vdom 有两个属性type和props
ii.	调度 scheduler   requestIdleCallback 是捡浏览器空闲来执行任务。循环调用performUnitOfWork函数，performUnitOfwork主要就是构建fiber树（深度优先），返回下一个nextUnitOfWork,
        1.为了保持不会阻碍主线程太长时间，以及能及时处理用户输入，保持动画流畅 react用了调度，把工作分解成多个小单元，在完成每个小单元后，如果需要执行其他的操作，我们就让浏览器中断渲染。这个小单元就是nextUnitOfWork, 
        2.页面是一帧一帧绘制出来的，当每秒绘制的帧数（FPS）达到 60 时，页面是流畅的，小于这个值时，用户会感觉到卡顿。
      浏览器完成高优先级处理后，如果没超过16ms说明时间是富余的，就会执行requestIdleCallback里面注册的任务，requestIdleCallback的回调函数接收dealine作为入参，deadline包含diditimeout，timeRemaining两个属性，
iii.	协调 reconcileChildren目的是创建fiber,然后对比新旧节点，看effectTag属性是更新还是创建，还是删除。 首先要知道children是当前节点的props.children(数组)，oldfiber是fiber.alternate.child(是个链表结构);
调和单个节点，调和列表数组
        1.调和单个节点
            如果key和节点类型都相等则直接复用，如果key为null我们也认为是相等的
        2.调和数组（使用到key） 
            设置newIndex,开始遍历新的children，对比oldFiber相同的index的key是否相等，如果相等，则复用节点，继续遍历，nextoldFiber = oldFiber.silbing;如果不相等则return null,结束第一次循环，
            如果newIndex小于数组长度，则说明新的元素有新增或者变换了位置，创建existingChildren(存放剩余oldfiber)的map,从当前newIndex开始第二次循环，根据key在map里面找，如果有并且type相同则复用。
         key的作用主要就是复用之前的节点的，没有key的话，数组就要每次全部删除然后重新创建，开销就非常大
iv.	commitRoot
1.	等nextUnitOfWork没有了，则表示fiber树构建完成，那么调用commitRoot函数，遍历fiberRoot，添加fiber.stateNode;
b)	State是同步的还是异步的
i.	可能是异步更新的
1.	直接在setState之后使用是异步的，在dom事件跟setTimeOut中使用是同步的。
2.	如果是对象的形式设置多个setState则进行浅合并（Object.assign），函数当然不会合并
ii.	前提
1.	调用setState  render  forceUpdate 会进入调度执行渲染操作
a)	调用scheduleUpdate函数
1.创建update
2.调用enqueueUpdate 把update添加到updateQueue(单项链表)
3.调用scheduleWork函数 导入调度中心，我们有更新
i.	update对象  用于记录组件状态改变,链表上的一个节点 ，多个Update可以同时存在  比如 三个setState更新后，创建三个Update对象，存放在UpdateQueue队列中(单项链表)，在做一次总体的更新。
1.	属性有 payload: setState传进来的值，
2.	next下个（setState）update对象,
3.	.callback setState中的回调 
4.	expirationtime过期的时间，不同的任务执行不同的种类的exp
ii.	updateQueue对象，挂在每个Fiber，状态更新的队列。
1.	baseState： state最终更新的结果
2.	firstUpdate: 队列中的第一个update
3.	lastUpdate
2.	类组件中的enqueueSetState（ins, payload, callback）跟scheduleUpdate函数内操作一样
3.	进入requestWork(root, expirationtime)函数 
a)	isBatchUpdates = true;
b)	performSyncWork
iii.	总结
1.	bacthedUpdate调用handlerClick方法并返回，等三次setState都调用完成把update都加入updateQueue之后才会进行调度performSyncWork
2.	等setTimeOut 和 自己添加的事件执行的时候，函数的执行栈变了，isBatchUpdate没有为ture的情况了，所以在每次调用setState之后都会进行调度更新，所以每次打印都是新的state，同时这样也会导致我们的应用性能变得很低，最好不要这样用
3.	React自身的机制比如生命周期，react中注册的事件都是符合 batchUpdate机制的

// 有限状态机的库 javascript-state-machine  https://github.com/jakesgordon/javascript-state-machine
/**
 * 事物拥有多种状态， 任一时间只会处于一种状态不会处于多种状态；
 动作可以改变事物状态， 一个动作可以通过条件判断， 改变事物到不同的状态， 但是不能同时指向多个状态， 一个时间， 就一个状态
 状态总数是有限的；
 javascript - state - machine
 form： 当前行为从哪个状态来
 to: 当前行为执行完会过渡到哪个状态
 name: 当前行为的名字
 fsm.can(t) -
     return true 如果过渡方法t可以从当前状态触发
 fsm.cannot(t) -
     return true 如果当前状态下不能发生过渡方法t
 fsm.transitions() - 返回从当前状态可以过渡到的状态的列表
 fsm.allTransitions() - 返回所有过渡方法的列表
 fsm.allStates() - 返回状态机有的所有状态的列表
 onBefore 在特定动作TRANSITION前触发
 onLeaveState 离开任何一个状态的时候触发
 onLeave 在离开特定状态STATE时触发
 onTransition 在任何动作发生期间触发
 onEnterState 当进入任何状态时触发
 onEnter 进入一个特定的状态STATE时触发
 on onEnter的简写
 onAfterTransition 任何动作触发后触发
 onAfter 在特定动作TRANSITION后触发
 on onAfter的简写
 */
class StateMechine{
    constructor(options){
        let {init, transitions, methods} = options;
        this.state = init;
        transitions.forEach(({from, to, name}) => {
            this[name] = function(){
                    let methodName = 'on' + name[0].toUpperCase() + name.slice(1);
                    if(this.state == from){
                        this.state = to;
                        methods[methodName].call(this, from, to, name);
                    }
                }
        });
    }
}
let stateMechine = new StateMechine({
    init: 'solid',
    transitions: [{
        name: 'melt',
        from: 'solid',
        to: 'liquid'
    },{
        name: 'freeze',
        from: 'liquid',
        to: 'solid'
    },{
        name: 'vaporize',
        from: 'liquid',
        to: 'gas'
    },{
        name: 'condense',
        from:'gas',
        to: 'liquid'
    }],
    methods: {
        onMelt: function(from, to, name){
            console.log(`当前的状态:${this.state}, 从${from}==>>${to}, 是个${name}过程`);
        },
        onFreeze: function(from, to, name){
            console.log(`当前的状态:${this.state}, 从${from}==>>${to}, 是个${name}过程`);

        },
        onVaporize: function(from, to, name){
            console.log(`当前的状态:${this.state}, 从${from}==>>${to}, 是个${name}过程`);

        },
        onCondense: function(from, to, name){
            console.log(`当前的状态:${this.state}, 从${from}==>>${to}, 是个${name}过程`);
        },
    }
})
stateMechine.melt();
stateMechine.vaporize();
stateMechine.condense();
stateMechine.freeze();
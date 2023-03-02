// show违反开放 - 封闭原则
// show方法逻辑太多太复杂
// 颜色状态切换不明显
// 过多的 if/else 让代码不可维护

class Battery {
    amount: string;
    state: SuccessState;
        constructor(state) {
            this.amount = 'high';
            this.state = new (SuccessState as any)();
        }
        show() {
            this.state.show();
            if (this.amount == 'high') {
                this.amount = 'middle';
                this.setState(new (WarningState as any)());
            } else if (this.amount == 'middle') {
                this.amount = 'low';
                this.setState(new (DangerState as any)());
            }
        }
        setState(state) {
            this.state = state;
        }
    }
class SuccessState {
    battery: Battery;
    constructor(battery) {
        this.battery = battery;
    }
    show() {
        console.log(`绿色 ${battery.amount}`);

    }
}
class WarningState {
    battery: Battery;
    constructor(battery) {
        this.battery = battery;
    }
    show() {
        console.log(`黄色 ${battery.amount}`);
    }
}
class DangerState {
    battery: Battery;
    constructor(battery) {
        this.battery = battery;
    }
    show() {
        console.log(`红色 ${battery.amount}`);
    }
}

let battery = new (Battery as any)();
battery.show();
battery.show();
battery.show();
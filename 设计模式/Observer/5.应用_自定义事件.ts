// let EventEmitter = require('events');
//实现
class EventEmitter {
    private _events = {};
    on(type, listener) {
        let listeners = this._events[type];
        if (listeners) {
            listeners.push(listener);
        } else {
            this._events[type] = [listener];
        }
    }
    emit(type, ...args) {
        let listeners = this._events[type];
        if (listeners) {
            listeners.forEach(listener => listener(...args));
        }
    }
}

let subject = new EventEmitter();
subject.on('click', (name, age) => { 
    console.log(1, name, age);
})
subject.on('click', (name, age) => {
    console.log(2, name, age);
})
subject.emit('click', 'jingyuan', 30);


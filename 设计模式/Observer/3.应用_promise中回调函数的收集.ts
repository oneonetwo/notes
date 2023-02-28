export { };
class Promise {
    successFn: Array<Function> = [];
    constructor(task) { 
        let resolve =  (res) => { 
            this.successFn.forEach(s => s(res));
        }
        task(resolve);
    }
    then(success) { 
        this.successFn.push(success);
    }
}

let promise = new Promise((resolve: (arg0: number) => void) => {
    setTimeout(() => { 
        resolve(100);
    },1000)
})
promise.then(res => { 
    console.log(res);
})
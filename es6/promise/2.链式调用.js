//链式调用
//1. then返回的是个promise, 那就采用这个promise的状态，作为成功或者失败，把promise的结果作为参数。
//2. 如果返回值是一个普通值，直接作为下一个then的成功的参数，
//3. 如果then中方法抛出异常，也会走失败，如果错误回调中返回一个普通值，那也会变成成果成功的状态。

class Promise{
    constructor(executor){
        this.status = 'pending';
        this.value;
        this.reason;
        this.fulfilled = [];
        this.rejected = [];
        let self = this;
        let resolve = (val)=>{
            if(self.status === 'pending'){
                self.value = val;
                self.status = 'fulfilled';
                console.log('进入then', self.status)
                self.fulfilled.forEach(fn=>fn());
            }
        };
        let reject = (err)=>{
            if(self.status === 'pending'){
                self.status = 'rejected';
                self.reason = err;
                self.rejected.forEach(fn=>fn());
            }
        }
        executor(resolve, reject);
    }
    _handleResolve(thenPromise, X, resolve, reject){
        //判断X是什么类型，普通值，promise, 
        if(X!==null && (typeof X === 'object' || typeof X==='function')){
            try {
                let then = X.then;
                if(typeof then === 'function'){
                    then.call(X, y=>{
                        // resolve(y);
                        // 如果是很多个promise
                        this._handleResolve(thenPromise, y, resolve, reject);
                    }, r=>{
                        reject(r);
                    })
                }else{
                    resolve(X);
                }
            } catch (error) {
                reject(error);
            }
           
        }
        return resolve(X);
    }
    _hanleReject(){

    }
    then(onfulfilled=_=>{}, onrejected=err=>{throw err}){
        //1. 返回一个promise
        let self = this;

        let thenPromise = new Promise((resolve, reject)=>{
            switch(self.status){
                case 'pending':
                    self.fulfilled.push(()=>{
                        setTimeout(()=>{
                            let X = onfulfilled(self.value);;
                            this._handleResolve(thenPromise, X, resolve, reject);
                        })

                    })
                    self.rejected.push(()=>{
                        onrejected(self.reason);
                    });
                    break;
                case 'fulfilled':
                    //返回值
                    setTimeout(()=>{
                        let X = onfulfilled(self.value);
                        console.log('123123213123');
                        this._handleResolve(thenPromise, X, resolve, reject);
                    })
                    break;
                case 'rejected':
                    let r = onrejected(self.value);
                    setTimeout(()=>{
                        reject(x);
                    })
                    break;
                    
            } 
        })
        return thenPromise;
    }
}
let p = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve('成功');
    }, 1000);
})
let p2 = p.then(data=>{
    console.log('第一个调用');
    return data+1000;
}, err=>{
    return err;
})
p2.then(data=>{
    console.log('第二次调用');
    console.log(data);
    return 456;
}, err=>{

})
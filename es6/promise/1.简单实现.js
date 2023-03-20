/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-03-20 09:37:03
 * @LastEditors: jy
 * @LastEditTime: 2023-03-20 11:18:14
 */
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
                self.status = 'fulfilled';
                self.value = val;
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

    then(onfulfilled, onrejected){
        switch(this.status){
            case 'pending':
                this.fulfilled.push(()=>{
                    onfulfilled(this.value);
                })
                this.rejected.push(()=>{
                    onrejected(this.reason);
                });
                break;
            case 'fulfilled':
                onfulfilled(this.value);
                break;
            case 'rejected':
                onrejected(this.value);
                break;
                
        } 
    }
}
let p = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        reject('失败');
    });
})
p.then(data=>{
    console.log(data);
}, err=>{
    console.log(err);
})



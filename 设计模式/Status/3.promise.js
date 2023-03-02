/*
 * @Description: 
 * @Author: yjy
 * @Date: 2023-03-02 07:33:13
 * @LastEditTime: 2023-03-02 07:33:20
 * @LastEditors: yjy
 * @Reference: 
 */
export { }
class Promise {
    constructor(fn) {
        this.state = 'initial';
        this.successes = [];
        this.fails = [];
        let resolve = (data) => {
            this.state = 'fulfilled';
            this.successes.forEach(item => item(data));
        }
        let reject = (error) => {
            this.state = 'failed';
            this.fails.forEach(item => item(error));
        }
        fn(resolve, reject);
    }
    then(success, fail) {
        this.successes.push(success);
        this.fails.push(fail);
    }
}
let p = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve(1);
    }, 1000);
});
p.then((data) => console.log('成功'), error => console.error('失败'));
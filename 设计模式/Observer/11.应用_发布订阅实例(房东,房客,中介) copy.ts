/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-02-28 09:50:11
 * @LastEditors: jy
 * @LastEditTime: 2023-02-28 11:21:48
 */
//中介
class Agency{
    _msg = {};
    publish(type, ...args) {
        let listeners = this._msg[type]||[];
        listeners.forEach(l=>l(...args));
    }
    subscribe(type, listener){
        let listeners = this._msg[type];
        if(listeners){
            listeners.push(listener);
        }else{
            this._msg[type] = [listener];
        }

    }
    

}
//房东通过中介发布消息
class Landlord{
    name: '北京房东'
    constructor(public agency: Agency){
    }
    lend(type, area, money){
        this.agency.publish(type, area, money);
    }
}

class Tenant{
    constructor(public agency: Agency, public name: string){}
    order(type){
        this.agency.subscribe(type, (...args)=>{
            console.log(this.name, ...args);
        })
    }
}
let agency = new Agency();
let landlord = new Landlord(agency);
let 北漂 = new Tenant(agency, 'programmer');
let 有钱人 = new Tenant(agency, 'engineer');
北漂.order('贵的');
有钱人.order('贵的');
landlord.lend('贵的', '1000平方', '100元');

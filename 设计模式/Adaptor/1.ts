/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-02-23 19:42:42
 * @LastEditors: jy
 * @LastEditTime: 2023-02-23 19:55:40
 */
class Socket {
    output(){
        return '220v';
    }
}
abstract class Power{
    abstract charge(): string;
}
class PowerAdaotor extends Power{
    constructor(public socket: Socket){
        super();
    }
    charge() :string{
        return `${this.socket.output()}转换成 22V`
    }
}

let adaptor = new PowerAdaotor(new Socket);
console.log(adaptor.charge());
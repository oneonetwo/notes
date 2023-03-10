/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-03-10 09:25:28
 * @LastEditors: jy
 * @LastEditTime: 2023-03-10 10:15:21
 */
class Cooker{
    execute(){
        console.log(this.constructor.name, '去做饭了' );
    }
}
class Cleaner{
    execute(){
        console.log(this.constructor.name, '去清洁了' );
    }
}
class Command{
    constructor(public cooker: Cooker, public cleaner: Cleaner){}
    execute(){
        this.cooker.execute();
        this.cleaner.execute();
    }
}
class Customer{
    constructor(command: Command){
        command.execute();
    }
}
new Customer(new Command(new Cooker, new Cleaner));
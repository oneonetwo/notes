/*
 * @Descripttion: 
 * @version: 
 * @Author: D
 * @Date: 2023-03-01 11:47:22
 * @LastEditors: jy
 * @LastEditTime: 2023-03-01 11:53:21
 */
class Disk {
    startUp(){
        console.log('打开Dist');
    }
    shutdown(){
        console.log('关闭Disk');
    }
}

class Memory {
    startUp(){
        console.log('打开Memory');
    }
    shutdown(){
        console.log('关闭Memory');
    }
}

class  Cpu{
    startUp(){
        console.log('打开Cup');
    }
    shutdown(){
        console.log('关闭Cup');
    }
}

class Computer{
    memory: Memory;
    disk: Disk;
    cpu: Cpu;
    constructor(){
        this.disk = new Disk();
        this.memory = new Memory();
        this.cpu = new Cpu();
    }
    startUp(){
        this.disk.startUp();
        this.memory.startUp();
        this.cpu.startUp();
    }
    shutdown(){
        this.disk.shutdown();
        this.memory.shutdown();
        this.cpu.shutdown();
    }
}

const computer = new Computer();
computer.startUp();
computer.shutdown();
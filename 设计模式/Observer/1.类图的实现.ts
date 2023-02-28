/*
 * @Description: 
 * @Author: yjy
 * @Date: 2023-02-26 21:52:17
 * @LastEditTime: 2023-02-27 22:12:22
 * @LastEditors: yjy
 * @Reference: 
 */
//学生作为观察者。老师作为主题对象
abstract class Student {
    name: string; 
    constructor(public teacher: Teacher, name: string) { 
        this.name = name;
    }
    abstract update(): void;
}
class Studentg extends Student {
    update(): void {
        console.log(`${this.name}听见了${this.teacher.name}说了${this.teacher.content}`)        
    }
}
class Teacher {
    students: Studentg[]; 
    name: string;
    content: string;
    constructor(name: string) { 
        this.students = [];
        this.name = name;
        this.content = '';
    }
    attach(student: Studentg) { 
        this.students.push(student);
    }
    notify() { 
        this.students.forEach(s => {
            s.update();
        });
    }
    setState() { 
        //内容改变发送通知；
        this.content = '今老师辞职了，以后有人养我了'
        this.notify();
    }
}
let teacher = new Teacher('王老师');
teacher.attach(new Studentg(teacher, 'Jane'));
teacher.attach(new Studentg(teacher, '牛清华'));
teacher.setState();

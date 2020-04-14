##### 1. JavaScript连续赋值的执行顺序
> 1. 多次赋值与顺序无关，是同时进行赋值的,如果有.,则.优先赋值;
> 2. 如果赋值是引用类型，则最终指向的是同一个对象
  ```javascript
    //例子1
    let a = { n: 2 };
    a.x = a = { l: 2 };
    a // { l: 2}
    a.x // undefined;  
    
    //例子2
    let a = { n: 2 };
    let b = a
    a.x = a = { l: 2 };
    a // { l: 2}
    b // {
	          n: 2，
            x: {
              l:2
            }
          }
          
     //例子3
     let a = {
        n:2
     }
     let b = a
     a.x  = a = {
        l:2
     }
     a.l = 3
     a // { l: 3 };
     b // {
            n: 2,
            x: {
              l: 3
            }
          }
  ```


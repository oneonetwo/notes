import React from 'react';
import ReactDOM from 'react-dom/client';
/**
 * 1. 在react里实现一个无缝埋点
 */
function afterClick(handleClick) { 
  return function (target, key, descriptor) { 
    let oldFun = descriptor.value;
    descriptor.value = function () { 
      handleClick.apply(this, arguments);
      console.log('点击之前的处理');
      let res = oldFun.apply(this, arguments);
      console.log('点击之后的处理');
      return res;
    }
  }
}
class App extends React.Components {
  @afterClick(() => { 
    //做了一些事
   })
  handleClick(){ 
    console.log('点击了')
  }

  //上报数据
  @afterClick(() => { fetch('./api.1')})
  handleChilkUpload() { 
    
  }
  render() { 
    return <div>
      <button onClick={handleClick}></button>
      <button onClick={handleChilkUpload}></button>
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
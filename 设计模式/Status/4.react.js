/*
 * @Description: 
 * @Author: yjy
 * @Date: 2023-03-02 07:37:01
 * @LastEditTime: 2023-03-02 07:37:25
 * @LastEditors: yjy
 * @Reference: 
 */
// babel https://codepen.io/zhufengnodejs/pen/LXogOy
const States = {
'show':function(){
  console.log("banner显示，点击可以关闭");
  this.setState({
    currentState: "hide"
  })
},
'hide':function(){
    console.log("banner隐藏，点击可以打开");
    this.setState({
      currentState: "show"
    })
}
}
class Banner extends React.Component{
state={currentState:'show'}
toggle = ()=>{
  let s = this.state.currentState;
  States[s] && States[s].apply(this);
}
render(){
  return (
    <div>
      {this.state.currentState=='show'&&<nav>导航</nav>}
      <button onClick={this.toggle}>隐藏</button>
    </div>
  )
}
}
ReactDOM.render(<Banner/>,document.getElementById('root'));
const btn1 = document.createElement('button')
const btn2 = document.createElement('button')
btn1.textContent='home'
btn2.textContent='about'
document.body.append(btn1)
document.body.append(btn2)

//动态加载
btn1.onclick=function(){
    import(/*webpackChunkName:"home"*/'./pages/home')
}
btn2.onclick=function(){
    import(/*webpackChunkName:"about"*/'./pages/about')
}
import '../styles/index.css'
import '../styles/test.less'
import '../styles/test2.scss'

// 1. css-loader style.loader
const ele = document.createElement('div')
ele.textContent = "hello world"
ele.className = 'testcss'
document.body.appendChild(ele)


// 2. less-loader
const ele1 = document.createElement('div')
ele1.textContent = "hello world"
ele1.className = 'testless'
document.body.appendChild(ele1)


//3. sass-loader
const ele2 = document.createElement('div')
ele2.textContent = "hello world"
ele2.className = 'testscss'
document.body.appendChild(ele2)
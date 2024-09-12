import imgtest from '../assets/images/ces.jpg';

// 1. css-loader style.loader
const ele = document.createElement('img')
ele.src = imgtest
ele.className = 'testcss'
document.body.appendChild(ele)

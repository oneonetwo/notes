
let h1 = document.createElement('h1')
h1.textContent = "about"
document.body.appendChild(h1)

export function bar(){
    console.log('bar exec')
}
const name = 'about'
export default name
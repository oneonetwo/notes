export default defineEventHandler((event)=>{
    let {req, res} = event.node
    return {
        code: 200,
        msg: 'login  get success',
        data: {
            name: 'jingyuan',
            age: 23
        }
    }
})
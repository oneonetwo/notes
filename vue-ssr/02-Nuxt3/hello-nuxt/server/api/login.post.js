export default defineEventHandler(async (event)=>{
    let {req, res} = event.node
    const query = getQuery(event)
    const method = req.method
    const body = await readBody(event)
    const bodyRaw = await readRawBody(event)
    console.log('body', body)
    //链接数据库
    return {
        code: 200,
        msg: 'login post success',
        data: {
            ...body,
            token: 'aabbcc'
        }
    }
})
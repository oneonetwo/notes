const labelService = require("../service/label.service")

const verifyLabelExits = async (ctx, next)=>{
    // 1. 获取labels
    const { labels } = ctx.request.body
    // 2. 查看标签是否都在label表中
    const exitsLabels = await labelService.queryLabelsByName(labels)
    // 3. 插入新增的数据
    const needInsetLabels = labels.filter(name=>{
        return !!!exitsLabels.find(l=>l.name === name)
    })
    const result = await labelService.batchCreate(needInsetLabels)
    // 3.1 获取插入的起始 ID 和插入的行数
    const insertId = result.insertId;
    const affectedRows = result.affectedRows;
    needInsetLabels.forEach(name=>{
        exitsLabels.push({
            id: insertId++,
            name
        })
    })
    // 4. 所有label放在ctx
    ctx.labels = exitsLabels
    await next()
}

module.exports = {
    verifyLabelExits
}
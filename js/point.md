## 编辑工具 视频接口

### 接口列表

| description | url | method | params | PS |
| :-----| :----- | :----- | :-----| :----- |
| 获取列表 | `/video/list` | GET | start,step,keywords | 过滤项全部非必填/video/list?start=0&step=1 |
| 新建一个视频 | `/video/new` | POST |  |  |
| 删除一个视频 | `/video/del` | POST | id |  |
| 获取某个视频详情 | `/video/details` | GET | id |  |
| 更新任务状态 | `/video/updatestatus` | POST | tskId |  |
| WebSocket | `/video/socket` |   | tskId | ws.send(tskId) |


### 接口说明

1. 获取视频列表接口
> - 路径: /video/list
> - 类型: get
> - 请求参数： start step  keywords 非必填
> - 返回值：  
>> - 请求成功：

```javascript
        {
            "data": [
                {
                    id: 12,
                    headline: "中集车辆2019年财报出炉",
                    createtime: "2020-04-03T04:38:08.000Z",
                    updatetime: "2020-04-03T04:38:08.000Z",
                    tskId: 1234,
                    document": "{\"document\":{\"title\":\"中集车辆2019年财报出炉\",\"keywords\":[\"中集车辆\",\"半挂车\",\"年度业绩\",\"财报\",\"运输\"],\"content\":[{\"ptype\":\"TEXT\",\"value\":\"美通社消息，2020年3月25日，中集车辆公布2019年年度业绩公告，2019年收益人民币232.2亿元，净利润13.3亿元，同比增长百分之7.7，归母净利润12.1亿元，同比增长百分之5.9。派付末期股息每股0.45元人民币。中集车辆致力于保证优良的现金流管理，总资产与净资产",
                    intype: 0,
                    result_state: null,
                    status: 0
                }
            ],
            "code": 0
        }
```
>> - 请求失败：

```javascript
        {
            code: -1
            message: 失败原因
        }
```
      
2. 新建视频接口
> - 路径: /video/new
> - 类型: POST
> - 请求参数：
> - 返回值：  
>> - 请求成功：
```javascript
        {
            "data": {
                "id": 18,
                "tskId": "1925",
                "headline": "中集车辆2019年财报出炉"
            },
            "code": 0
        }
```
>> - 请求失败：
```javascript
        {
            code: -1
            message: 失败原因
        }
```
        
3. 删除视频接口
> - 路径: /video/new
> - 类型: POST
> - 请求参数：
> - 返回值：  
>> - 请求成功：
```javascript
        {
            code: 0
        }
```
>> - 请求失败：
```javascript
        {
            code: -1
            message: "Delete failed",
        }
```  
4. 获取视频详情
5. 更新视频状态
> - 路径: /video/updatestatus
> - 类型: POST
> - 请求参数：tskId
> - 返回值：  
>> - 请求成功：
```javascript
        {
            "data": {
                "message": "任务执行成功",
                "code": 0,
                "videoinfo": {
                    "url": "http://cross-api-1251455682.cosbj.myqcloud.com/20200408/1925_1925.mp4?sign=ydu4iLoxYu4RMUqeVkMq3pFS86JhPTEyNTE0NTU2ODImaz1BS0lEcTI3NHBjZ2ZzdnFiQVdoYktxVXdGTUd5VGxzcWdReUwmZT0xNTg2NDQzNDU2JnQ9MTU4NjMxMzg1NiZyPTE4MTUwMDU5NiZmPS8yMDIwMDQwOC8xOTI1XzE5MjUubXA0JmI9Y3Jvc3MtYXBp"
                }
            },
            "code": 0
        }
```
>> - 请求失败：
```javascript
        {
            "message": "tskId 不存在",
            "code": -1
        }
```
6. 服务器消息推送
> - WebSocket示例：
```javascript
   if(window.WebSocket){
        let ws = new WebSocket('ws://127.0.0.1:3000/video/socket');
        ws.onopen = function(e){
            ws.send(1965);
        }
        ws.onclose = function(e){
            console.log("服务器关闭");
        }
        ws.onerror = function(e){
            console.log("连接出错", e);
        }
        ws.onmessage = function(e){
            //接受数据
            console.log(e.data);
        }		
    }
```

#	组件
##	Generic Table
### 参数
- data: 表格数据
表格数据的结构是由BI部后端制定的,有问题请找绍星或者杨涛。
- onClick?: 对表中数据添加自定义点击操作
以列名*columnName*为键，*带有表格内容参数的函数*为值
示例： 
``` javascript
{
"projectId": (id) => history.go('/project/' + id)
}
```
- goToPage?: 跳转到指定页面的回调函数
参数为指定页码， goToPage为可选参数，若不传则不会显示 *pagination* 组件
- pageSize?: 当前页面大小
- changePageSize?: 修改页面大小的回调函数
参数为指定页面大小
pageSize changePageSize 为可选参数，若不传则不会显示 *当前每页X条* 组件
- downloadFile?: 下载页面数据的回调函数
downloadFile 为可选参数，若不传则不会显示 *右上角下载图标* 组件
- operation?: 操作列显示的按钮
1. switch 开关
2. edit 编辑
3. delete 删除
4. copy 复制链接
5. analyze 分析
6. downloadQR 下载二维码
以上都是 *带有表格内容参数的函数*
- orderColumnBean?: 当前的表格排序
表格排序对象里至少应该包含 *排序列名* 和 *排序是否升降序* 两个字段
- setOrderColumnBean?: 修改表格排序的回调函数
orderColumnBean setOrderColumnBean 为可选参数，若不传则不会显示 *排序* 组件
### 说明
若表格带有特殊样式需处理 请将处理的代码写在util->specialCases 里面
data为当前数据表头
row为当前这一行的所有数据
要获取当前这一个单元格的数据可以通过row[data.columnName]来读取。

##	Echarts Component
### 参数
- theme
- opts
 theme opts 请见 [echarts.init文档](https://echarts.apache.org/en/api.html#echarts.init)
- option
- notMerge
- lazyUpdate
option notMerge lazyUpdate 请见 [echartsInstance.setOption文档](https://echarts.apache.org/en/api.html#echartsInstance.setOption)

### 说明
该组件封装echarts，以便在options发生改变时自动调用setOption更新图表

##	Selection Block
### 参数
- nameKey: 应该显示对象中的哪个键值作为显示用
- valueKey: 应该显示对象中的哪个键值作为数据用
- allData?: 选择所用的数据，应为对象数组
- searchKey?: 搜索框输入的值,
- setSearchKey?: 修改搜索框输入值的回调函数
searchKey setSearchKey 为可选参数，若不传则不会显示 *搜索* 组件
- selectedData: 已选择的数据;
- setSelectedData: 修改已选择的数据的回调函数
- isDraggable?: 判断某一值是否可被拖动的回调函数
参数为判断的值，返回值为布尔， 默认() => false，既所有值都不可被拖动
- isDisabled?: 判断某一值是否可被选择的回调函数
参数为判断的值，返回值为布尔， 默认() => true，既所有值都可被选择

### 说明
该组件大体功能和roi.select一致，重新封装主要是为了和设计的样式一致。

# Hooks
## useRouter
来源于[roi脚手架](http://gitlab.sys.wanmei.com/html5/wm-webpackCLI-mutilPro/blob/master/src/test/hooks/router/index.jsx) ，因每个项目的不同需求做稍微修改
## useEventListener
window.addEventListener的语法糖，可以保证在组件被销毁时自动执行removeEventListener
来源于[usehooks.com](https://usehooks.com/)
## useLocalStorage
window.localStorage的语法糖，可以像普通useState组件一样用localStorage里存储的值
来源于[usehooks.com](https://usehooks.com/)
## usePromise
来源于[roi脚手架](http://gitlab.sys.wanmei.com/html5/wm-webpackCLI-mutilPro/blob/master/common/hooks/promise.jsx)
## useCurrentMenu
返回当前页面属于哪个一级菜单，用于侧栏顶栏的当前菜单高亮
## useFetch
fetch的语法糖，因为后端经常会需要修改request的header，所以抽出来，方便在同一个地方修改， 并且增加了是否在调用中(loading)状态的返回
参数与fetch一致，返回值与fetch.then(data.json)一致
## useMountedRef
判断当前组件是否被销毁的语法糖，若组件已被销毁，返回值会变为false
## useTab
用于操作地址栏query的语法糖，可以像普通useState组件一样用地址栏query里存储的值

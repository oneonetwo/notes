### useFetch vs axios

1. 获取数据Nuxt推荐使用useFetch函数,为什么不是axios?
    1. useFetch底层调用的是$fetch函数,该函数是基于unjs/ohmyfetch请求库,并与原生的Fetch API有者相同API
    2. unjs/ohmyfetch是一个跨端请求库:Abetter fetchAPI.Works on node, browser and workers
        1. 如果运行在服务器上,它可以智能的处理对API接口的直接接调用
        2. 如果运行在客户端行,它可以对后台提供的API接口正常的调用(类似axios),当然也支持第三方接口的调用
        3. 会自动解析响应和对数据进行字符串化
2. useFetch支持智能的类型提示和智能的推断API响应类型
3. 在setup中用useFetch获取数据,刷新页面时会减去客户端重复发起的请求。
4. useFetch(url,options)语法
    > 参数
    > url:请求的路径
    > options:请求配置选项
        >> method、query(别名params)、body、headers、baseURL
        >> onRequest、onResponse、lazy....
    > 返回值:data,pending,error,refresh

### useFetch的封装
1. 封装useFetch步骤
    1. 定义HYRequest类,并导出
    2. 在类中定义request、get、post方法
    3. 在request中使用useFetch发起网络请求
    4. 添加TypeScript类型声明


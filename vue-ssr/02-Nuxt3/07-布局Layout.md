### 布局 Layout
1. `Layout`布局是页面的包装器,可以将多个页面共性东西抽取到Layout布局中
    > 例如:每个页面的页眉和页脚组件,这些具有共性的组件我们是可以以写到一个Layout布局中。
2. `Layout布局`是使用<slot>组件来显示页面中的内容
3. Layout布局有两种使用方式:
    1. 方式一:默认布局
        1. 在layouts目录下新建默认的布局组件,比如:`layouts/default.vue`
        2. 然后在`app.vue`中通过<NuxtLayout>内置组件来使用
    2. 方式二: 自定义布局(CustomLayout)

继续在layouts文件夹下新建Layout布局组件,比如:layouts/custorm-layout.vue
然后在app.vue中给<NuxtLayout>内置组件指定name属性的值为:custom-layout
>也支持在页面中使用`definePageMeta`宏函数来指定layout布局

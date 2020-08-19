# react typescript项目起步
1. 使用官方脚手架进行安装
    - `npx create-react-app my-app --typescript`
        1. npx 使用项目内部模块，调用更方便
2. 文件结构和代码规范
    - Extending the ESLint config [create-react-app官方文档](https://create-react-app.dev/docs/setting-up-your-editor) 
        1. es-lint手动添加配置文件
3. 样式解决方案
    - 样式方案
        1. Lnline CSS      CSS in JS     Styled component    Less/Sass
    - 样式系统文件结构
    ```
        styles/
            _variables.scss（各种变量以及可配置设置）
            _mixins.scss(全局 mixins)
            _functions.scss (全局functions)
    ```
    - 创建组件库的色彩体系
    - 组件库样式变量分类 `样式值都抽象程变量，就变得高度可配置的系统`
        1. 基础色彩系统
        2. 字体系统
        3. 表单
        4. 按钮
        5. 边框和阴影
        6. 可配置的开关
    - [normalize.css](https://github.com/necolas/normalize.css)  修复浏览器的bug并保证浏览器的一致性
        1. `npm install --save normalize.css`
        2. Download  https://necolas.github.io/normalize.css/latest/normalize.css
4. scss @import
    - Sass 扩展了 CSS 的 @import 规则，让它能够引入 SCSS 和 Sass 文件。 所有引入的 SCSS 和 Sass 文件都会被合并并输出一个单一的 CSS 文件。
    - Sass Partials
        1. **可以在文件名前面加一个下划线，就能避免被编译,叫做**
        2. Example "_colors.scss":  引用 @import "colors";
5. Button需求分析
        
    
    
    

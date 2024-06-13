/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true, //单引号
        semi: false, //不适用分号
        printWidth: 80, //宽度80字符
        trailingComma: 'none', //不加对象|数组最后一项的逗号
        endOfLine: 'auto' //换行符号不限制（mac  win不一致）
      }
    ],
    // vue组件名称多单词组成（忽略index.vue）
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index']
      }
    ],
    // props结构关闭
    'vue/no-setup-props-destructure': ['off']
  }
}

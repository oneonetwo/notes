/**
 * 1. 正常情况下执行一个node程序,直接跟上我们对应的文件即可
 *      > node index.js
 * 2. 但是,在某些情况下执行node程序的过程中,我们可能希望给node传递一些参数:
 *      > node index.js env=development coderwhy
 * 3. 如果我们这样来使用程序,就意味着我们需要在程序中获取到传递的参数:
 *      > 获取参数其实是在 ** process ** 的内置对象中的;
 *      > 如果我们直接打印这个内置对象,它里面包含特别的信息:
 *          1. 其他的一些信息,比如版本、操作系统等大家可以自行查看,后面用到一些其他的我们还会提到;
 * 4. 现在,我们先找到其中的argv属性:
 *     1. 我们发现它是一个数组,里面包含了我们需要的参数,
 * 
 */

argv: [
    '/usr/local/bin/node',
    '/users/coderwhy/Desktop/Node/TestCode/04_learn_node/02_给Node传递参数/index.js',
    'development'
]



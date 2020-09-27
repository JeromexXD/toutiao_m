/* *
 *  PostCSS 是基于 Node.js 运行的一个处理 css 工具
 */
module.exports = {
  // 配置要是用的相关插件
  /* plugins: {
    // 自动添加浏览器厂商的声明前缀
    autoprefixer: {
      // browsers 用来配置要兼容的系统环境，因为 vuecli 默认配置了 .browserslistrc 文件来处理所以写到 .browserslistrc 里面 在这里写编译时会警告
      browsers: ['Android >= 4.0', 'iOS >= 8']
    }, */
  // 把 px 转为 rem
  'postcss-pxtorem': {
    // 转换的根元素基准值
    // 按照设计稿指定 750 宽的设计稿 750 / 10
    // 375 / 10 = 37.5
    // vant 组件库是基于37.5设计的 如果我们的设计稿是 750 还要 / 2 来保持一致
    rootValue: 37.5,
    // 需要转换的 css 属性 * 所有
    propList: ['*']
  }
}

# Button
- 属性
1. 大小尺寸
2. 按钮类型
3. disabled 状态
- 方法
4. button 事件？直接联合内置的 a 标签 或者按钮标签的类型

# 后面再优化下Alert 样式

# 测试
- 高质量的代码
- 更早的发现bug，减少成本
- 让重构和升级变得更加容易和可靠
- 让开发流程更加的敏捷
- 测试金字塔，有顶层到底层：UI -> Service -> Unit(单元测试)
- react 组件是单独的，非常适合单元测试
- 通用的测试框架 Jest
- 测试用例后面再写

# Menu 组件
- 自己写一次

# Tabs
- 样式完善

# Icon 
- 上古时代 - 雪碧图（CSS sprite）
- 近代 - Font Icon，Font Icon 还有很多奇怪的 BUG 
- 现代和未来 - SVG 完全可控，Font Icon 要下载全部的字体文件
- https://www.npmjs.com/package/@fortawesome/react-fontawesome

# React Transition Group
- React 动画库
- animate.css 这个网站可以查动画，想要的动画

# 报nde-sass错的坑
set SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/
npm install node-sass

# npm publish 发布

## 为什么使用TS？
1. 程序更容易理解
- 接受什么样的参数？
- 返回什么样的类型？
- 动态语言需要手动调试过程...
2. 效率更高
- 代码块跳转
- 自动补全
- 丰富的接口提示
3. 更少的错误
- 编译期间可以发现一些低级错误
- 比如打错字段，类型错误
4. 完全兼容javascript
- 编译后就是js代码。

- 唯一的一个小缺点就是需要一定的学习成本。
- 短期内增加一些开发成本

## 使用ts
npm i -g typescript

npx create-react-app my-app --typescript

## 测试金字塔
- UI
- service
- Unit

采用一个测试框架Jest

高版本react脚手架内置了，如果没有要安装开发依赖：@testing-libray/react

再安装一个小工具：jest-dom，增加断言库。针对dom的断言。代码可读性更高。
cnpm i -D @testing-library/jest-dom

## 设计组件
1. 明确需要的需求，大小颜色，等等
2. 以使用者的角度先写伪代码
3. 不要过渡封装，高可用，可扩展性强
4. 实现代码的时候，不要一口吃成一个胖子，循序渐进，先实现简单的。
5. 第四点很重要，很重要；

## XHR and Fetch
1. XHR
- 兼容性很好，但是API不友好，设计很粗造，不符合分离原则
- 后面jquery进行了封装，当时很火。
- 后起之秀axios，和promise配合；
```js
JQuery.ajax({
  type:'POST',
  url:'http',
  data:{},
  dataType:'json',
  success:() => {},
  error:() => {}
})
```

2. Fetch
- 基于promise，只对网络请求报错，对400，500都当做成功的请求
- 默认不会带cookie，需要添加默认项；
- 不支持abort，不支持超时控制
- 没有办法原生监测请求的进度

## 文件上传
1. 传统的表单提交
- encType: multipart/form-data
2. js发送异步请求
- Content-Type: multipart/form-data


## js 模块化
1. script 脚本引入
2. 立即执行函数，jq时代
3. define 形式的amd，node的commonjs
4. es 标准 es6 module，目前只有最新的浏览器支持，支持得也很有限制
- webpack这样的打包工具就出现了。把资源打包成 bundler


## 发布之前对代码质量进行检查
- 单元测试减少BUG，规范代码增加团队合作，增加代码的高度可维护性。
- "pre-commit": "npm run test:nowatch && npm run lint" commit 代码前会执行test脚本和lint脚本，保证代码的质量；
```js
   "husky": {
     "hooks": {
       "pre-commit": "npm run test:nowatch && npm run lint"
     }
   },
```

## 运行 build-storybook 生成静态文档；

## CI 持续集成
- 频繁的把代码提交到master，防止产品分离到别的分支，以后持续集成难度大。
- 集成要经过一些严格的检查或者测试，也就是敏捷开发；

## CD持续交付，持续部署
- 代码经过测试，评审之后上生产；










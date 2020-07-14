import React from 'react'
import { storiesOf } from '@storybook/react'

const markdownText = `
### 安装

~~~javascript
npm install hrt-react-ui --save
~~~
    
### 使用

~~~javascript
// 加载样式
import 'hrt-react-ui/dist/index.css'
// 引入组件
import { Button } from 'hrt-react-ui'
~~~

### 组件亮点

* 使用 react-testing-library 编写单元测试，护航组建库健壮性
* 使用 storybook 自动生成文档页面，方便查阅和使用
* 使用 typescript 和 React Hooks，完整的类型声明，不再维护面条代码
* 使用 react-window, react-fontawesome, react-transition-group丰富三方库扩充组件
`
storiesOf('简介', module)
  .add('welcome', () => {
    return (<>
      <h2>欢迎来到 hrt-react-ui 组件库</h2>
    </>)
  },
    {
      info: { text: markdownText, source: false, }
    })
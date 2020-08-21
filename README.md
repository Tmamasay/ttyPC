


## 项目结构

本项目已经为你生成了一个完整的开发框架，下面是整个项目的目录结构。

```sh
├── .github                    # git log
├── plop-templates             # 基本模板
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── assets                 # 静态资源
│   ├── components             # 全局公用组件
│   ├── constants              # 常量
│   ├── core                   # 分层
│   ├── enum                   # 枚举
│   ├── filters                # 全局 filter
│   ├── icons                  # 项目所有 svg icons
│   ├── lang                   # 国际化 language
│   ├── layout                 # 全局 layout
│   ├── router                 # 路由
│   ├── store                  # 全局 store 管理
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局公用方法
│   ├── pages                  # pages 所有页面
│   ├── pwa                    # 渐进式Web应用
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
│   └── permission.js          # 权限管理
├── tests                      # 测试
├── .editorconfig              # 代码风格
├── .env.xxx                   # 环境变量配置
├── .eslintrc.js               # eslint 配置项
├── .sentryclirc.js            # 前端异常日志监控配置
├── .babel.config              # babel 配置
├── plopfile.js                # 基本模板配置
├── vue.config.js              # vue-cli 配置
├── postcss.config.js          # postcss 配置
└── package.json               # package.json
...
```



## 安装

```sh

# 安装依赖
npm install

# 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 本地开发 启动项目
npm start
```

> TIP
>
> 强烈建议不要用直接使用 cnpm 安装，会有各种诡异的 bug，可以通过重新指定 registry 来解决 npm 安装速度慢的问题。若还是不行，可使用 [yarn](https://github.com/yarnpkg/yarn) 替代 `npm`。
>
> Windows 用户若安装不成功，很大概率是`node-sass`安装失败，[解决方案](https://github.com/PanJiaChen/vue-element-admin/issues/24)。
>
> 另外因为 `node-sass` 是依赖 `python`环境的，如果你之前没有安装和配置过的话，需要自行查看一下相关安装教程。



启动完成后会自动打开浏览器访问 [http://localhost:9000， 你看到下面的页面就代表操作成功了。



<img src="https://imgkr.cn-bj.ufileos.com/5a1ea14f-ba92-4ae9-b950-e53d969a2fa8.png" style="zoom: 67%;" />



接下来你可以修改代码进行业务开发了，本项目内建了典型业务模板、模拟数据、状态管理、国际化、全局路由等等各种实用的功能来辅助开发

## 常用命令

```sh
# 项目打包
npm run build:xxx

# 自动创建
npm run new

# 规范Git提交
npm run git-cz

# 生成CHANGELOG
npm run genlog
```


### 目录结构

**vue-h5-template** 所有全局样式都在 `@/src/styles` 目录下设置

```bash
├── styles
│   ├── _animation               # 按钮样式
│   ├── index.scss               # 全局通用样式
│   ├── _mixin.scss              # 全局mixin
│   ├── _transition.scss         # 过渡效果
│   └── variables.scss           # 全局变量
```



## 生成所需文件

在开发过程中,无论我们添加页面也好还是添加组件等等。都需要不停地新建 `.vue`文件(或者其他框架或者html/js/css文件) 

以Vue项目为例, 我们新建一个component 或 view 的时候，需要新建一个.vue文件，然后写 `<template>、<script>、<style>`。最后写我们的业务代码。如果使用 class 风格来写 Vue 还需要在每个页面都引入 Vue 和Component

既然这种重复性的工作，而且并没有实际的操作难度，我们是学不到任何东西的，那有没有什么办法可以告别手敲呢， 在这里给大家介绍一个插件 [plop](https://www.npmjs.com/package/plop)，它的使用方式比较简单，在这里我不做过多介绍了，大家可以查阅文档，或者直接拉取本模板进行查阅



本项目中我一个配置了5项，他们分别代表着什么呢？

```js
module.exports = function(plop) {
  plop.setGenerator('page', pageGenerator)        			// Page
  plop.setGenerator('component', componentGenerator)		// 组件
  plop.setGenerator('store', storeGenerator)				// vuex
  plop.setGenerator('interactor', interactorGenerator)		// 业务逻辑
  plop.setGenerator('db-interactor', dbInteractorGenerator)	//db业务逻辑
}
```

> TIP
>
> 创建模板指令是 npm run new，记得属于目录或文件名称哦
> @chengxu 1056421380@qq.com
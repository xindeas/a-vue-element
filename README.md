# a-vue-element

> 一个简单的 Vue.js + element UI 框架。<br/>
> 本框架的设计理念是将框架尽可能的简化，将所有配置集中一起避免了眼花缭乱的尴尬。<br/>
> 终极目标是构建一个新手也能开盖即用的可配置化轻量级框架。<br/>


## 开始

``` bash
# 安装依赖
npm install

# 运行
npm run dev

# 打包
npm run build
```
## 个人配置
### const.js
<p>
主要配置都在<i>'src/utils/const.js'</i>中，该文件用于存放项目的所有常量，具体各个参数说明见文件内部注释。
</p>
<p>
你也可以使用运行命令运行项目打开一级菜单中的<strong>设计器</strong>进行配置，最后点击
<button style="background: #F0F9EB;color: #67c23a;border-radius: 5px;border: 1px solid #c2e7b0;">导出</button>
将配置信息粘贴<strong>覆盖</strong>至<i>'src/utils/const.js'</i>文件。
</p>

## 目录结构
src－－<br/>
　　　｜－assets: 静态资源<br/>
　　　｜－base: 基础页面（视情况而定，可有可无）<br/>
　　　｜－components: 自定义组件<br/>
　　　｜－layout: 页面布局<br/>
　　　｜－router: 路由<br/>
　　　｜－store: 状态管理<br/>
　　　｜－utils: 工具，配置文件const.js也在这里<br/>
　　　｜－views: 菜单页面，菜单路由默认读取的目录<br/>

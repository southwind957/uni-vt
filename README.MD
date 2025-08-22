<p align="center">
  <a href="https://gitee.com/southwind957/uni-vt.git">
    <img src="image/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">完全基于VUE3+VITE的uniapp模板</h3>
  <p align="center">
    大大缩短你花在项目构建的时间
    <br />
    uni-vt是一个基于uniapp+vite5+ts+vue3开发的uniapp快速启动模板。包含（mock、pinia、地图、scss、unocss等）。无需hbuilder x，不管你使用何种工具都可以快速启动。
    <br />
    uni是指uniapp，uni-vt基于uniapp，利用其跨平台特性为您提供更加高效的开发体验。VT是Vue3和Vite的首字母，我们希望通过Vue3和Vite来加速uniapp开发。让您更快的进入Vue3+uniapp的开发。
    <br />
<br />
    <br />
    <a href="https://gitee.com/southwind957/uni-vt.git">Gitee地址</a>
    ·
    <a href="https://github.com/southwind957/uni-vt.git">GitHub地址</a>
    <!-- ·
    <a href="https://github.com/shaojintian/Best_README_template/issues">文档</a> -->
  </p>

</p>

## 目录

- [上手指南](#上手指南)
  - [开发前的配置要求](#开发前的配置要求)
  - [安装步骤](#安装步骤)

- [分支特性](#分支特性)
- [开发的架构](#开发的架构)
- [部署](#部署)
- [使用到的框架](#使用到的框架)
- [贡献者](#贡献者)
  - [如何参与开源项目](#如何参与开源项目)

- [版本控制](#版本控制)
- [作者](#作者)
- [鸣谢](#鸣谢)

### 上手指南

###### 开发前的配置要求

1. 首先确定你已了解uniapp开发。
2. 确定你已经了解VITE+Vue3开发。
3. 确定你已经安装好Nodejs环境。
4. 确定你已经安装好Git工具。

###### **安装步骤**

1. 取代码仓库到本地

```sh
git clone https://gitee.com/southwind957/uni-vt.git
```

2. 使用pnpm安装依赖

```sh
pnpm install
```

3. 使用vite开发模式运行项目

```sh
pnpm dev:mp-weixin
```

<!-- ### 文件目录说明
eg:

```
filetree
├── ARCHITECTURE.md
├── LICENSE.txt
├── README.md
├── /account/
├── /bbs/
├── /docs/
│  ├── /rules/
│  │  ├── backend.txt
│  │  └── frontend.txt
├── manage.py
├── /oa/
├── /static/
├── /templates/
├── useless.md
└── /util/

``` -->

### 分支特性

由于在最近的更新中引入了alova.js，如果你需要使用原生封装的uni.request，那么请切换到native-request分支，分支保留了原生的请求封装。因为客观原因，此该分支暂时停止更新，若有计划后将会把其他分支的特性引入进来。

### 开发的架构

使用Vite+uniapp+vue3开发。

### 使用到的框架

- [Uniapp](https://uniapp.dcloud.io/quickstart)
- [Vite](https://cn.vitejs.dev/)
- [Vue3](https://v3.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [UnoCSS](https://github.com/unocss/unocss)
- [wot-design-uni](https://wot-design-uni.cn/guide/introduction.html)
- [Alova](https://alova.js.org/zh-CN/)

### 贡献者

## 贡献者们

感谢给uni-vt贡献过代码的 [开发者](https://gitee.com/southwind957/uni-vt/repository/stats/master)。

#### 如何参与开源项目

贡献使开源社区成为一个学习、激励和创造的绝佳场所。你所作的任何贡献都是**非常感谢**的。

1. Fork仓库
2. 建立分支(`git checkout -b feature/AmazingFeature`)
3. 提交修改(`git commit -m 'Add some AmazingFeature'`)
4. 推送分支(`git push origin feature/AmazingFeature`)
5. 提交[pull request](https://gitee.com/southwind957/uni-vt/pulls)

#### 加入我们

维护一个开源项目需要花费时间与精力，尤其是uniapp需要兼容不同的平台，这更是一项庞大的工作，因此衷心希望有一群志同道合的朋友加入我们。如果您希望加入我们，请发送邮件至921013871@qq.com或者直接添加同名QQ好友。我们一起维护这个uni-vt，让它变得更好。

### 版本控制

该项目使用Git进行版本管理。您可以在repository参看当前版本。

### 作者

921013871@qq.com &ensp; 张佳佳

抖音:uni-vt &ensp; qq:921013871

_您也可以在贡献者名单中参看所有参与该项目的开发者。_

### 版权说明

该项目签署了MIT License 授权许可，详情请参阅 [LICENSE.txt](http://www.apache.org/licenses/LICENSE-2.0)

### 鸣谢

- [wot-design-uni](https://wot-design-uni.cn/guide/introduction.html) 感谢wot-desgin-uni团队，提供各种各样的组件库，让我们能站在巨人的肩膀上，更快的开发项目。

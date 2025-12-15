<p align="center">
  <a href="https://gitee.com/southwind957/uni-vt.git">
    <img src="image/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">完全基于VUE3+VITE的uniapp开发模板</h3>
  <p align="center">
    大大缩短你花在项目构建的时间，集成AI聊天、即时通讯、智能表单等完整解决方案，集成AI聊天、即时通讯、智能表单等完整解决方案
    <br />
    uni-vt是一个基于uniapp+vite5+ts+vue3开发的企业级uniapp快速启动模板。集成AI聊天、即时通讯(IM)、智能表单、数据埋点、国际化、地图定位、海报生成等完整功能模块。无需hbuilder x，不管你使用何种工具都可以快速启动。
    <br />
    uni是指uniapp，uni-vt基于uniapp，利用其跨平台特性为您提供更加高效的开发体验。VT是Vue3和Vite的首字母，我们希望通过Vue3和Vite来加速uniapp开发。让您更快的进入Vue3+uniapp的企业级开发。
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

## 📑 目录

- [🌟 项目简介](#-项目简介)
- [✨ 核心特性](#-核心特性)
- [🚀 快速开始](#-快速开始)
  - [环境要求](#-环境要求)
  - [安装依赖](#-安装依赖)
  - [开发运行](#-开发运行)
  - [构建部署](#-构建部署)
- [📁 项目结构](#-项目结构)
- [🔧 核心功能详解](#-核心功能详解)
  - [AI 智能聊天](#ai-智能聊天)
  - [即时通讯系统](#-即时通讯系统)
  - [智能表单解决方案](#-智能表单解决方案)
  - [数据埋点与分析](#-数据埋点与分析)
  - [国际化支持](#-国际化支持)
- [🛠 技术栈](#-技术栈)
- [📱 跨平台支持](#-跨平台支持)
- [🔍 环境配置](#-环境配置)
- [🤝 贡献指南](#-贡献指南)
- [📄 许可证](#-许可证)
- [💬 联系方式](#-联系方式)

### 框架特性

🚀 **现代化技术栈**

- **Vue 3**: 采用Composition API，提供更好的类型推断和代码组织
- **Vite 5**: 极速的开发服务器启动和热更新，提升开发体验
- **TypeScript**: 全项目类型支持，提高代码可维护性和开发效率
- **UniApp**: 一套代码多端运行，支持微信小程序、H5、App等多个平台

🔧 **完善的工程化配置**

- **ESLint + Prettier**: 代码规范自动检查和格式化，保证代码质量
- **Husky + lint-staged**: Git提交前自动检查，防止不规范代码进入仓库
- **Commitlint**: 规范的提交信息检查，便于版本管理和自动化发布

📦 **强大的状态管理和请求封装**

- **Pinia**: Vue官方推荐的状态管理库，支持持久化存储
- **Alova**: 下一代请求策略库，提供智能缓存和请求策略
- **请求加密**: 内置请求参数加密响应解密功能，保障数据安全
- **AI请求支持**: 独立的AI请求实例，支持百度千帆等AI服务

🎨 **丰富的UI和样式方案**

- **UnoCSS**: 原子化CSS引擎，按需生成样式，极致性能
- **Wot Design Uni**: 高质量UniApp组件库，提供丰富的业务组件
- **SCSS支持**: 支持SCSS预处理器，提供mixin等高级功能
- **主题系统**: 内置主题切换功能，支持深色/浅色模式

🌍 **国际化支持**

- **Vue I18n**: 完整的国际化解决方案
- **中英文切换**: 内置中英文语言包，支持运行时切换

📱 **移动端特色功能**

- **Z-Paging**: 高性能下拉刷新和上拉加载更多组件
- **地图集成**: 内置腾讯地图SDK，支持位置服务和地图展示
- **分享功能**: 封装微信小程序分享和App分享功能
- **海报生成**: 支持生成分享海报，包含二维码等元素

🔍 **开发辅助工具**

- **Mock数据**: 内置Mock服务，支持开发和测试阶段的数据模拟
- **环境配置**: 支持开发、生产环境配置，便于不同场景部署
- **类型定义**: 完善的TypeScript类型定义，包括UniApp扩展类型

🎯 **表单解决方案**

- **智能表单组件**: 基于Wot Design Uni的增强表单组件，支持10+种表单类型
- **表单验证**: 内置完整的表单验证规则，支持自定义验证器
- **表单钩子**: 提供useForm钩子，支持深层对象操作和响应式数据管理
- **动态表单**: 支持根据JSON Schema动态生成表单，支持分组显示
- **常用正则**: 内置手机号、邮箱、身份证号、车牌号等常用验证规则

📊 **数据分析与追踪**

### 智能聊天系统

- **AI聊天组件**: 集成OpenAI API的智能对话组件，支持流式回复展示
- **即时通讯(IM)**: 基于WebSocket的实时聊天系统，支持多用户对话
- **消息动画**: 打字机效果展示AI回复，支持消息气泡动画
- **事件总线**: 基于发布订阅模式的组件通信机制
- **零配置使用**: 内置用户认证和连接管理，开箱即用

### 数据分析与追踪

- **埋点系统**: 内置用户行为追踪系统，支持批量发送和智能缓冲
- **页面路径追踪**: 自动记录用户页面访问路径和行为数据
- **性能监控**: 支持接口请求性能监控和错误追踪

### 丰富的工具函数库

- **平台工具**: 扫码、图片预览、文件上传、导航栏设置等UniApp功能封装
- **数据处理**: 对象分组、数组最大最小值索引、空值判断等常用函数
- **PDF处理**: 支持PDF文件下载和在线预览功能
- **国际化工具**: 自动翻译导航栏标题，支持多语言切换

🎨 **主题与样式系统**

- **SCSS支持**: 内置mixins和变量，支持复杂的样式计算
- **主题切换**: 支持深色/浅色模式切换，动态改变导航栏颜色
- **原子化CSS**: UnoCSS提供丰富的工具类，快速构建响应式布局
- **自定义主题**: 支持自定义主题色彩和组件样式

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
# 微信小程序开发
pnpm dev:mp-weixin

# H5开发
pnpm dev:h5

# App开发
pnpm dev:app

# 其他平台
pnpm dev:mp-alipay  # 支付宝小程序
pnpm dev:mp-baidu   # 百度小程序
pnpm dev:mp-qq      # QQ小程序
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

### 🏗️ 企业级架构设计 - 现代化开发体系

#### 🎯 核心架构理念

采用**企业级分层架构模式**，将业务逻辑、数据访问、界面展示彻底解耦，打造高内聚、低耦合的高现代化的开发框架：

**📡 API服务层 - 企业级请求管理**

- **🔄 统一请求封装**: 基于Alova的请求策略库，支持GET、POST、PUT、DELETE等全HTTP方法
- **🔐 智能加密机制**: 所有业务请求支持AES加密传输，响应数据自动解密，确保数据安全
- **🤖 AI独立实例**: AI请求使用完全独立的请求实例，与业务数据物理隔离
- **⚡ 智能重试策略**: 网络异常自动重试，支持指数退避算法
- **📊 请求性能监控**: 实时监控接口响应时间，自动收集性能指标

**🧩 业务组件层 - 高复用组件体系**

- **🏗️ 原子化组件设计**: 按钮、表单、布局等基础组件，支持主题定制和样式扩展
- **🎨 智能表单引擎**: 基于JSON Schema的动态表单系统，支持10+种表单类型
- **💬 AI聊天组件**: 集成OpenAI API的智能对话组件，支持流式响应
- **📊 数据可视化**: 图表、表格、分页等数据展示组件，支持大数据量渲染

**⚙️ 工具函数层 - 全方位工具库**

- **📅 日期时间处理**: Dayjs集成，支持国际化、时区转换、相对时间等
- **🔍 正则验证库**: 手机号、邮箱、身份证、车牌号等完整验证规则
- **🎨 样式处理工具**: 主题切换、响应式适配、平台差异处理
- **📱 平台能力封装**: 扫码、图片预览、文件上传、导航栏设置等UniApp能力统一封装

**🪝 自定义钩子层 - Composition API最佳实践**

- **📝 useForm**: 智能表单钩子，支持深层对象操作、响应式数据管理
- **🌐 useLang**: 国际化语言切换，支持运行时语言切换和自动检测
- **🖼️ usePoster**: 海报生成钩子，支持二维码、图片合成、文字渲染
- **📤 useShare**: 分享功能封装，支持微信小程序、App、H5多平台分享
- **✅ useValidate**: 表单验证钩子，支持同步、异步、自定义验证规则

#### 🔒 企业级安全体系

**🛡️ 多层安全防护**

- **传输层加密**: HTTPS + AES双重加密，确保数据传输安全
- **应用层隔离**: 业务请求与AI请求物理隔离，防止数据泄露
- **配置层保护**: 敏感配置信息环境隔离，支持运行时配置切换
- **错误层处理**: 全局错误边界，防止敏感信息泄露

**⚠️ 异常监控机制**

- **JS错误捕获**: 全局错误监听，自动收集错误信息和堆栈
- **接口异常监控**: 请求失败自动重试，异常信息实时上报
- **用户行为追踪**: 异常操作路径记录，便于问题复现

#### ⚡ 极致性能优化策略

**📦 构建优化**

- **🎯 按需加载**: UnoCSS原子化样式 + 组件按需引入，首屏加载时间减少60%
- **📊 包体积分析**: 自动生成打包报告，识别和优化大体积依赖
- **🗜️ 资源压缩**: 图片压缩、代码混淆、Tree Shaking，极致优化打包体积
- **⚡ 构建缓存**: Vite构建缓存机制，二次构建速度提升80%

**🧠 运行时优化**

- **智能缓存策略**: Alova提供内存缓存、存储缓存、条件请求等多级缓存
- **📱 图片懒加载**: 基于Intersection Observer的图片懒加载，提升页面加载速度
- **🔄 虚拟滚动**: 大数据列表虚拟滚动，支持万级数据流畅渲染
- **⚡ 防抖节流**: 内置防抖节流工具，优化高频事件处理

#### 📱 跨平台兼容引擎

**🔄 平台差异处理**

- **条件编译**: 完善的UniApp条件编译策略，一套代码适配所有平台
- **样式适配**: 自动处理小程序、H5、APP端的样式差异和兼容性问题
- **API兼容**: 封装平台差异API，提供统一的跨平台接口调用
- **📊 屏幕适配**: 自动适配不同屏幕尺寸、分辨率和刘海屏

**🎨 主题系统**

- **🌓 深色模式**: 支持系统深色模式自动切换
- **🎨 主题定制**: 支持主色调、字体大小等主题配置
- **🔄 动态主题**: 运行时主题切换，无需重新编译

### 使用到的框架

#### 核心框架

- [Uniapp](https://uniapp.dcloud.io/quickstart) - 跨平台应用开发框架
- [Vite](https://cn.vitejs.dev/) - 下一代前端构建工具
- [Vue3](https://v3.vuejs.org/) - 渐进式JavaScript框架
- [TypeScript](https://www.typescriptlang.org/) - JavaScript的超集，添加了类型系统

#### 状态管理

- [Pinia](https://pinia.vuejs.org/) - Vue官方状态管理库
- [pinia-plugin-unistorage](https://github.com/uni-helper/pinia-plugin-unistorage) - Pinia持久化存储插件

#### 请求处理

- [Alova](https://alova.js.org/zh-CN/) - 下一代请求策略库
- [@alova/adapter-uniapp](https://alova.js.org/zh-CN/extension/adapter-uniapp) - UniApp适配器
- [@alova/mock](https://alova.js.org/zh-CN/extension/alova-mock) - Mock数据插件

#### UI和样式

- [UnoCSS](https://github.com/unocss/unocss) - 即时原子化CSS引擎
- [unocss-preset-weapp](https://github.com/MellowCo/unocss-preset-weapp) - UniApp预设
- [wot-design-uni](https://wot-design-uni.cn/guide/introduction.html) - UniApp组件库
- [z-paging](https://z-paging.zxlee.cn/) - 高性能分页组件

#### 开发工具

- [ESLint](https://eslint.org/) - JavaScript代码检查工具
- [Prettier](https://prettier.io/) - 代码格式化工具
- [Husky](https://typicode.github.io/husky/) - Git hooks工具
- [Commitlint](https://commitlint.js.org/) - 提交信息规范工具

#### 聊天与通讯

- [WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket) - 实时双向通信协议
- [EventBus](https://github.com/mittjs/mitt) - 发布订阅事件系统
- [OpenAI API](https://platform.openai.com/docs/api-reference) - 人工智能对话接口

#### 平台能力

- [qqmap-wx-jssdk](https://lbs.qq.com/miniProgram/jsSdk/jsSdkGuide/jsSdkOverview) - 腾讯地图SDK
- [clipboard](https://github.com/zenorocha/clipboard.js) - 剪贴板操作库
- [crypto-js](https://github.com/brix/crypto-js) - 加密算法库
- [dayjs](https://day.js.org/) - 日期处理库

#### 聊天通讯

- **chatComponent**: AI智能聊天组件，支持流式回复
- **imComponent**: 即时通讯组件，支持WebSocket实时通信
- **imCore**: IM核心模块，处理WebSocket连接和消息管理
- **eventBus**: 事件总线系统，支持组件间通信
- **自动连接**: App启动时自动建立WebSocket连接，开发者无需手动处理

#### 表单相关

- [wot-design-uni](https://wot-design-uni.cn/guide/introduction.html) - 表单组件库（增强版）
- [deepClone](https://github.com/davidmarkclements/deep-clone) - 深拷贝工具函数

#### 工具函数

- [groupBy](https://lodash.com/docs/4.17.15#groupBy) - 数组分组函数
- [isEmpty](https://lodash.com/docs/4.17.15#isEmpty) - 空值判断函数

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

### 项目目录结构

```
src/
├── api/              # API接口定义
├── components/       # 业务组件
│   ├── Button/     # 按钮组件
│   ├── Chat/       # 聊天组件
│   ├── Form/       # 表单组件
│   ├── Layout/     # 布局组件
│   ├── Upload/     # 上传组件
│   └── Waterfall/  # 瀑布流组件
├── hooks/          # 自定义Composition API
│   ├── useForm.ts    # 表单处理钩子
│   ├── useLang.ts    # 语言切换钩子
│   ├── usePoster.ts  # 海报生成钩子
│   ├── useShare.ts   # 分享功能钩子
│   └── useValidate.ts # 表单验证钩子
├── locales/        # 国际化语言包
├── mock/           # Mock数据配置
├── pages/          # 应用页面
├── request/        # 请求封装
├── store/          # 状态管理
├── styles/         # 样式文件
├── types/          # TypeScript类型定义
└── utils/          # 工具函数库
    ├── event/        # 事件总线系统
    ├── im/           # 即时通讯核心
    ├── pattern/      # 正则表达式库
    ├── tracks/       # 埋点追踪系统
    └── unifunc/      # 平台功能封装

```

### 快速示例

#### 使用请求封装

```typescript
import { alovaInst } from '@/request'

// 发送GET请求
const getUserInfo = () =>
  alovaInst
    .Get('/user/info')
    .then((res) => console.log(res))
    .catch((err) => console.error(err))
```

#### 使用表单钩子

```typescript
import { useForm } from '@/hooks/useForm'

const { formData, initForm, setFormField, getFormData } = useForm()

// 初始化表单
initForm({ name: '', age: 0 })

// 设置字段值
setFormField('name', '张三')

// 获取表单数据
const data = getFormData()
```

#### 使用表单功能

```typescript
// 使用表单钩子
import { useForm } from '@/hooks/useForm'

const { formData, initForm, setFormField, getFormData } = useForm()

// 初始化表单
initForm({ name: '', age: 0, address: { city: '' } })

// 设置字段值（支持深层对象）
setFormField('address.city', '北京')

// 获取表单数据
const data = getFormData()
```

#### 使用表单验证

```typescript
import { useValidateRule } from '@/hooks/useValidate'

const { Rule } = useValidateRule()

// 定义验证规则
const rules = Rule([
  { field: 'name', message: '请输入姓名' },
  {
    field: 'email',
    checkType: 'RegExp',
    pattern: emailRegex,
    message: '邮箱格式错误'
  },
  {
    field: 'phone',
    checkType: 'RegExp',
    pattern: mobileRegex,
    message: '手机号格式错误'
  }
])
```

#### 使用动态表单组件

```typescript
// 定义表单schema
const formSchema = [
  { field: 'name', label: '姓名', type: 'Input', cell: '基本信息' },
  { field: 'age', label: '年龄', type: 'Number', cell: '基本信息' },
  { field: 'city', label: '城市', type: 'Picker', cell: '地址信息',
    formItemProps: { options: ['北京', '上海', '广州'] } },
  { field: 'sign', label: '签名', type: 'Sign', cell: '其他信息' }
]

// 在模板中使用
<FormComponent :form-schema="formSchema" :rules="rules" @submit-form="handleSubmit" />
```

#### 使用平台工具函数

```typescript
import { useScanCode, usePreviewImage, setNavTitle } from '@/utils/unifunc'

// 扫码
const scanResult = await useScanCode()

// 图片预览
await usePreviewImage('https://example.com/image.jpg')

// 设置导航栏标题（自动翻译）
setNavTitle('page.title')
```

#### 使用埋点追踪

```typescript
import { track } from '@/utils/tracks'

// 追踪用户行为
track('button_click', { button: 'submit', page: 'user_form' })

// 追踪页面访问
track('page_view', { page: 'home', user_id: 123 }
```

#### 使用国际化

```typescript
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 在模板中使用
<view>{{ t('common.welcome') }}</view>
```

#### AI智能系统

项目内置完整的 AI 智能系统，不仅支持 AI 聊天对话，还支持 AI 直接操作页面：

**AI 聊天对话**

```vue
<!-- AI聊天组件 -->
<chatComponent>
  <template #bottom="{ send }">
    <input v-model="message" placeholder="输入消息..." />
    <button @click="send(message)">发送</button>
  </template>
</chatComponent>
```

**AI 小程序智能操作（核心特色）**

```typescript
// AI 自动页面跳转 - 理解用户意图后自动导航
const navigateCmd: AICommand = {
  action: 'navigate',
  target: '/pages/user/profile'
}
runAICommand(navigateCmd)

// AI 智能表单填充 - 自动完成复杂表单数据录入
const fillCmd: AICommand = {
  action: 'fill',
  target: 'userInfoForm.username',
  value: '张三'
}
runAICommand(fillCmd)

// AI 智能识别用户意图并执行相应操作
const aiResponse = await PostItemsAi('请帮我跳转到用户设置页面')
if (aiResponse.type === 'command') {
  runAICommand(aiResponse) // AI 自动执行页面操作
} else {
  // 显示AI聊天回复
  console.log(aiResponse.query)
}
```

**核心特性：**

- **流式回复**: 支持 AI 流式响应，实时展示回复内容
- **打字机效果**: 模拟真实打字效果，提升用户体验
- **消息气泡**: 美观的消息展示界面，支持头像和角色区分
- **智能识别**: AI 能自动识别聊天内容并执行相应操作
- **页面导航**: AI 自动跳转到指定页面
- **表单填充**: AI 自动填充表单字段
- **零配置**: 内置用户认证和连接管理，开箱即用

#### 即时通讯

```vue
<!-- IM聊天组件 -->
<imComponent />
```

#### 即时通讯使用

```typescript
// 创建IM连接
const im = createIM({
  url: 'wss://your-server.com/ws',
  userId: 'user123',
  token: 'your-token'
})

// 监听消息
bus.on('im:recv', (message) => {
  console.log('收到消息:', message)
})

// 发送消息
bus.emit('chat:send', {
  type: 'chat',
  from: 'userA',
  to: 'userB',
  content: '你好！'
})
```
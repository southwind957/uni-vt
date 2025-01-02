# uni-ts-app

本项目是一个使用TypeScript构建的uniapp应用，集成了数据加密解密、UI框架和HTTP请求封装等功能。该项目旨在提供一个结构清晰、易于维护且功能完备的开发框架，以加速uniapp应用的开发流程。

## 项目特点

- **TypeScript**: 利用TypeScript的强类型特性，提高代码的可读性和可维护性。
- **uniapp**: 基于uniapp框架，支持多端编译，一次开发，多平台运行。
- **数据加密解密**: 实现了数据的安全传输，保护用户隐私和数据安全。
- **UI框架**: 集成了一套响应式的UI框架，提供丰富的组件和界面元素。
- **HTTP封装**: 对HTTP请求进行了封装，简化了API调用流程，提高了代码复用性。

## 开发环境

- **编程语言**: TypeScript
- **开发工具**: Visual Studio Code
- **框架**: uniapp
- **加密库**: CryptoJS
- **UI框架**: uview-plus
- **HTTP客户端**: uniapp内置请求方法

## 功能模块

1. **数据加密解密**
   - 提供了数据加密和解密的功能，确保数据在传输过程中的安全。
2. **UI框架**
   - 集成了一套完整的UI组件库，支持自定义主题和样式。
3. **HTTP请求封装**
   - 对外提供了统一的HTTP请求接口，简化了API调用和错误处理。

## 安装指南

1. 克隆项目到本地：
   ```bash
   git clone https://gitee.com/southwind957/uni-ts-app.git
   ```
2. 进入项目目录并安装依赖：
   ```bash
   cd uni-ts-app
   npm install
   ```
3. 启动开发服务器：
   ```bash
   npm run dev:h5
   ```


# 框架使用手册

本框架基于uniapp+typescript，已配置接口加解密，公共的请求等基础配置。

## 技术文档

uniapp：[uniapp官方网站](https://uniapp.dcloud.net.cn/quickstart.html)

typescript：[ts官网](https://www.typescriptlang.org/)

vue3：[vue3官网](https://cn.vuejs.org/)

uview-plus: [uview-plus](https://uiadmin.net/uview-plus/ '官方链接')

## vscode编辑

在开始编码之前，需配置vscode，其余配置已经写在工作区，可在.vscode文件夹中查看，配置如下：

```json
{
  "editor.formatOnSave": true,
  "editor.tabSize": 2
}
```

有工作区文档之后需要安装插件用于提示uniapp特有标签：

![1721370593450](image/README/1721370593450.png)

此外还需下载prettier插件用于规范语法。插件下载之后即可正常使用

## 编码规范

### 请求发送

本项目采用自行封装的方法来进行请求访问，请求已封装如下：

```typescript
/**
 * @description: 网络请求
 * @param {netWork} params
 * @return {Promise}
 */
const request = (params: netWork): Promise<Response> => {
  const config = requestInterceptor(params)
  return new Promise((resolve, reject) => {
    uni.request({
      ...config,
      success: (res) => {
        resolve(responseInterceptor(res))
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
```

若要新建请求，在api文件夹新增自己的api文件，采用如下风格进行编码：

```typescript
import request from '@/common/request'

interface Response {
  data: string | AnyObject | ArrayBuffer
}
export const getTest = (params: netWork): Promise<Response> => {
  return request({
    url: '/test',
    method: 'GET',
    data: params
  })
}
```

在页面中引入封装的api之后，使用如下代码即可获取到数据：

```typescript
const data = ref({})

async function getData(): Promise<void> {
  const res = await getTest({ name: 'test' })
  console.log(res)
  data.value = res.data
}
```

若需要传不传参数的请求，请如下配置(后续可能会优化，统一写在api文件方便修改)：

```typescript
export const getTest = (): Promise<Response> => {
  return request({
    url: '/imgs',
    method: 'GET',
    data: {}
  })
}
```

项目已配置prettier和eslint，若出错代码是不能运行的，其他规范遵循这些规则就好。

## 接口加密

### 加密开关

在文件的.env.production文件有如下代码：

```shell
VITE_APP_ENCRYPTION_DISABLE = 1
```

将此代码注释或者置为0即可关闭接口加密。数据加密无需特别处理，若后端没有加密这取消此项，若后端进行加密就把加密打开。

### 配置加密白名单

在当前目录的src/common/config文件中，有代码如下：

```typescript
// 加密白名单
export const whiteList = ['/login']
```

只需要在该数组中添加白名单地址即可不加密放行。

## 项目运行

详见根目录package.json文件，执行

1. 安装依赖 `npm i`
2. 本地运行 `npm run dev:x`
3. 构建运行 `npm run build:x`

## 常见问题解决

### TypeScript引用模块报红问题

在ts中，引用的模块存在还是会有红线错误提示，不影响使用，想关闭走如下步骤：

1. 查看报错模块名称
2. 在env.d.ts加入如下定义（假如是引用加密相关报错），即可解决TypeScript引用报红问题。

```typescript
declare module 'crypto-js'
declare module 'crypto-js/tripledes'
```

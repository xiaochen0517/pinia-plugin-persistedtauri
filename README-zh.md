<p align="center">
    <img src="./docs/images/logo.png" width="120" height="120" alt="logo">
</p>

<p align="center">
    <i>此图标基于
    <a href="https://prazdevs.github.io/pinia-plugin-persistedstate/">pinia-plugin-persistedstate</a>
    和 
    <a href="https://pinia.vuejs.org/">pinia</a></i>
</p>

<h1 align="center">pinia-plugin-persistedtauri</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/pinia-plugin-persistedstate">
    <img alt="npm" src="https://img.shields.io/npm/v/pinia-plugin-persistedstate?color=%23c12127&label=version&logo=npm" />
  </a>
  <a href="https://github.com/prazdevs/pinia-plugin-persistedstate/tree/HEAD/LICENSE">
    <img alt="License" src="https://img.shields.io/github/license/prazdevs/pinia-plugin-persistedstate?color=%233da639&logo=open%20source%20initiative" />
  </a>
</p>

<p align="center">
  <a href="./README.md" alt="pinia-plugin-persistedtauri english docs" >
    English
  </a>
  |
  <a href="./README-zh.md" alt="pinia-plugin-persistedtauri chinese docs" >
    简体中文
  </a>
</p>

## ✨ 快速开始

### 🚚 安装

```bash
# npm
npm install --save pinia-plugin-persistedtauri

# yarn
yarn add pinia-plugin-persistedtauri
```

### 🛠 配置

```ts
import {createPinia} from 'pinia'
import {createPersistedState} from 'pinia-plugin-persistedtauri'

const pinia = createPinia()
pinia.use(createPersistedState())
```

### ⚙️ 选项

您可以不执行任何操作，插件将自动启动，但您也可以进行一些配置。

```ts
defineStore('main', {
  state: () => ({
    count: 0,
  }),
  persist: true, // 默认为 true ，可以使用 false 禁用持久化
})
```

```ts
// 使用 false 禁用持久化
persist: boolean | PersistedTauriOptions

type PersistedTauriOptions = {
  // 默认使用 store ID 作为数据的文件名或者键名，如果你想自定义，可以使用这个选项
  name?: string,
  // 自定义存储模式，兼容 localStorage 和 sessionStorage
  storage?: AsyncStorage | Storage,
  // 自定义数据保存方式，目前只支持 StorageSaveType.JSON
  saveType?: StorageSaveType,
}
```

## 🗝️ 许可证

[MIT LICENSE](./LICENSE)


<p align="center">
    <img src="./docs/images/logo.png" width="120" height="120" alt="logo">
</p>

<p align="center">
    <i>The icon are based on 
    <a href="https://prazdevs.github.io/pinia-plugin-persistedstate/">pinia-plugin-persistedstate</a>
    and 
    <a href="https://pinia.vuejs.org/">pinia</a></i>
</p>

<h1 align="center">pinia-plugin-persistedtauri</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/pinia-plugin-persistedtauri">
    <img alt="npm" src="https://img.shields.io/npm/v/pinia-plugin-persistedtauri?color=%23c12127&label=pinia-plugin-persistedtaur&logo=npm" />
  </a>
  <a href="https://github.com/xiaochen0517/pinia-plugin-persistedtauri/blob/master/LICENSE">
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

## ✨ Quickstart

### 🚚 Install

```bash
# npm
npm install --save pinia-plugin-persistedtauri

# yarn
yarn add pinia-plugin-persistedtauri
```

### 🛠 Configuration

```ts
import {createPinia} from 'pinia'
import {createPersistedState} from 'pinia-plugin-persistedtauri'

const pinia = createPinia()
pinia.use(createPersistedState())
```

### ⚙️ Options

You can do nothing and the persistent save will work automatically, but you can also do some configuration.

```ts
defineStore('main', {
  state: () => ({
    count: 0,
  }),
  persist: true, // default: true
})
```

```ts
// use false to disable persist
persist: boolean | PersistedTauriOptions

type PersistedTauriOptions = {
  // The file name or key name of the data is stored by default, using the store ID
  name?: string,
  // Customizing storage mode, compatible with localStorage and sessionStorage
  storage?: AsyncStorage | Storage,
  // Customizing the way data is saved, currently only StorageSaveType.JSON is supported.
  saveType?: StorageSaveType,
}
```

## 🗝️ License

[MIT LICENSE](./LICENSE)


# Install

```bash
# npm
npm install --save pinia-plugin-persistedtauri

# yarn
yarn add pinia-plugin-persistedtauri
```

# Usage

```ts
import {createPinia} from 'pinia'
import {createPersistedState} from 'pinia-plugin-persistedtauri'

const pinia = createPinia()
pinia.use(createPersistedState())
```

# Options

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

# License

[MIT LICENSE](./LICENSE)


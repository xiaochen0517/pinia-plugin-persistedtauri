import { type PiniaPluginContext, type StateTree } from 'pinia'

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S extends StateTree, Store> {
    /**
     * Persists store in storage.
     * @see https://prazdevs.github.io/pinia-plugin-persistedstate
     */
    persist?: boolean
  }

  export interface PiniaCustomProperties {
    /**
     * Rehydrates store from persisted state
     * Warning: this is for advances usecases, make sure you know what you're doing.
     * @see https://prazdevs.github.io/pinia-plugin-persistedstate/guide/advanced.html#forcing-the-rehydration
     */
    $hydrate: (opts?: { runHooks?: boolean }) => void

    /**
     * Persists store into configured storage
     * Warning: this is for advances usecases, make sure you know what you're doing.
     * @see https://prazdevs.github.io/pinia-plugin-persistedstate/guide/advanced.html#forcing-the-persistence
     */
    $persist: () => void
  }
}
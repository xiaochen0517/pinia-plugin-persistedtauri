import {type StateTree} from 'pinia'

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S extends StateTree, Store> {
    /**
     * Persists store in storage.
     */
    persist?: boolean | PersistedTauriOptions;
  }
}

export interface AsyncStorage {
  isAsyncStorage: boolean
  getItem: (key: string) => Promise<string | null>
  setItem: (key: string, value: string) => Promise<void>
  removeItem: (key: string) => Promise<void>
  clear: () => Promise<void>
}

export type PersistedTauriOptions = {
  name?: string,
  storage?: AsyncStorage | Storage,
  saveType?: StorageSaveType,
}

export enum StorageSaveType {
  JSON,
}

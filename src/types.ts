declare module "pinia" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface DefineStoreOptionsBase<S extends StateTree, Store> {
    /**
     * Persists store in storage.
     */
    persist?: DefineStoreOptionsPersist;
  }
}

export type DefineStoreOptionsPersist = boolean | Partial<PersistedTauriOptions> | undefined;

export interface AsyncStorage {
  /**
   * Asynchronous storage tag, a property that distinguishes between asynchronous and synchronous storage
   * can be true or false
   */
  isAsyncStorage: boolean
  getItem: (key: string) => Promise<string | null>
  setItem: (key: string, value: string) => Promise<void>
  removeItem: (key: string) => Promise<void>
  clear: () => Promise<void>
}

export enum StorageSaveType {
  JSON,
}

export type PersistedTauriOptions = {
  name: string,
  storage: AsyncStorage | Storage,
  serializer: StateSerializer,
  saveType: StorageSaveType,
}

export interface StateSerializer {
  serialize: (state: unknown) => string
  deserialize: (state: string) => unknown
}

import {AsyncStorage, DefineStoreOptionsPersist, PersistedTauriOptions, StorageSaveType} from "./types";
import {invoke} from "@tauri-apps/api/tauri";
import {StateTree} from "pinia";

class TauriStorage implements AsyncStorage {
  isAsyncStorage: boolean = true;

  getItem(key: string): Promise<string | null> {
    return new Promise<string | null>((resolve, reject) => {
      invoke("get_item", {
        key: key
      }).then((data: unknown) => {
        resolve(String(data));
      }).catch((err: string) => {
        reject(err);
      });
    });
  }

  setItem(key: string, value: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      invoke("set_item", {
        key: key,
        value: value
      }).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
    });
  }

  removeItem(key: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      invoke("remove_item", {
        key: key
      }).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
    });
  }

  clear(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      invoke("clear").then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

export const defaultPersistedTauriOptions: PersistedTauriOptions = {
  name: "pinia-state",
  storage: new TauriStorage(),
  saveType: StorageSaveType.JSON,
};
 
export const saveState = (state: StateTree, options: PersistedTauriOptions, userOptions: DefineStoreOptionsPersist): Promise<void> => {
  const {name, storage, saveType} = options;
  if (name === undefined || name === null) {
    return Promise.reject("Name is undefined");
  }
  if (storage === undefined || storage === null) {
    return Promise.reject("Storage is undefined");
  }
  if (saveType === undefined || saveType === null) {
    return Promise.reject("Save type is undefined");
  }
  const currentStorage = getDefaultOrUserStorage(storage, userOptions);
  if (storageIsAsyncStorage(currentStorage)) {
    return (currentStorage as AsyncStorage).setItem(name, JSON.stringify(state, null, 2));
  }
  (currentStorage as Storage).setItem(name, JSON.stringify(state, null, 2));
  return Promise.resolve();
};

const getDefaultOrUserStorage = (storage: AsyncStorage | Storage, userOptions: DefineStoreOptionsPersist): AsyncStorage | Storage => {
  // if the user has configured storage, the user-configured storage is used directly
  if (userStorageIsNotNone(userOptions)) {
    return storage;
  }
  // check current environment is browser or tauri
  // if tauri, use tauri storage
  // else use browser storage
  if (isTauri()) {
    return new TauriStorage();
  } else {
    return localStorage;
  }
};

const userStorageIsNotNone = (userOptions: DefineStoreOptionsPersist): boolean => {
  return userOptions !== undefined && userOptions !== null && typeof userOptions !== "boolean"
    && userOptions.storage !== undefined && userOptions.storage !== null;
};

const isTauri = (): boolean => {
  return !!(window as any).__TAURI__;
};

const storageIsAsyncStorage = (storage: AsyncStorage | Storage): boolean => {
  return storage.isAsyncStorage !== undefined && storage.isAsyncStorage !== null && typeof storage.isAsyncStorage === "boolean";
};

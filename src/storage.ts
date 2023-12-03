import {AsyncStorage, PersistedTauriOptions, StorageSaveType} from "./types";
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
}

export const saveState = (state: StateTree, options: PersistedTauriOptions): Promise<void> => {
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

  if (storage.isAsyncStorage !== undefined && storage.isAsyncStorage !== null && typeof storage.isAsyncStorage === "boolean") {
    return (storage as AsyncStorage).setItem(name, JSON.stringify(state, null, 2));
  } else {
    (storage as Storage).setItem(name, JSON.stringify(state, null, 2));
    return Promise.resolve();
  }
}

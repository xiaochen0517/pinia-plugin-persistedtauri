import {AsyncStorage, PersistedTauriOptions} from "./types";
import {StateTree} from "pinia";
import {TauriStorage} from "./storages/TauriStorage";
import {JsonSerializer} from "./storages/JsonSerializer";

const getDefaultStorage = (): AsyncStorage | Storage => {
  if (isTauri()) {
    return new TauriStorage();
  }
  return window.localStorage;
};

const isTauri = (): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return !!(window as any).__TAURI__;
};

export const defaultPersistedTauriOptions: PersistedTauriOptions = {
  name: "pinia-state",
  storage: getDefaultStorage(),
  serializer: new JsonSerializer(),
};

export const saveState = (state: StateTree, options: PersistedTauriOptions): Promise<void> => {
  const checkResult = checkParams(options);
  if (checkResult !== null) {
    return Promise.reject(checkResult);
  }
  const serialized = options.serializer.serialize(state);
  if (storageIsAsyncStorage(options.storage)) {
    return (options.storage as AsyncStorage).setItem(options.name, serialized);
  }
  (options.storage as Storage).setItem(options.name, serialized);
  return Promise.resolve();
};

const storageIsAsyncStorage = (storage: AsyncStorage | Storage): boolean => {
  return storage.isAsyncStorage !== undefined && storage.isAsyncStorage !== null && typeof storage.isAsyncStorage === "boolean";
};

export const getState = (options: PersistedTauriOptions): Promise<unknown> => {
  const checkResult = checkParams(options);
  if (checkResult !== null) {
    return Promise.reject(checkResult);
  }
  if (!options.name) {
    return Promise.reject("OptionsName is undefined");
  }
  if (storageIsAsyncStorage(options.storage)) {
    return new Promise((resolve, reject) => {
      (options.storage as AsyncStorage).getItem(options.name).then((data: string | null | undefined) => {
        if (data === undefined || data === null || data === "") {
          return reject("Data is undefined or null");
        }
        return resolve(options.serializer.deserialize(data));
      }).catch((err) => {
        reject(err);
      });
    });
  }
  const resultItem = (options.storage as Storage).getItem(options.name);
  if (resultItem === null || resultItem === undefined || resultItem === "") {
    return Promise.reject("Data is undefined or null");
  }
  return Promise.resolve(resultItem);
};

const checkParams = (options: PersistedTauriOptions): string | null => {
  const {name, storage} = options;
  if (name === undefined || name === null) {
    return "Name is undefined";
  }
  if (storage === undefined || storage === null) {
    return "Storage is undefined";
  }
  return null;
};

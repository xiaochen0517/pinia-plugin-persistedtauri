import {AsyncStorage} from "../types";
import {invoke} from "@tauri-apps/api/tauri";

export class TauriStorage implements AsyncStorage {

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

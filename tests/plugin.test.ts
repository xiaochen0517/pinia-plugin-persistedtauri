import {describe, expect, test} from "@jest/globals";
import {createPersistedState} from "../src";
import {createPinia, defineStore, setActivePinia} from "pinia";

// mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();
Object.defineProperty(window, "localStorage", {value: localStorageMock});

const testStore = defineStore("test", {
  state: () => ({count: 0}),
  actions: {
    increment() {
      this.count++;
    },
  },
  persist: true,
});

describe("Test src/plugin.ts", () => {
  test("Test createPersistedState()", () => {
    // 创建一个新的 Pinia 实例
    const pinia = createPinia();
    const plugin = createPersistedState();
    // 应用你的插件
    pinia.use(plugin);
    const store = testStore(pinia);
    expect(store).toBeDefined();
    expect(store.count).toBe(0);
    store.increment();
    expect(store.count).toBe(1);
    console.log("window.localStorage", localStorage);
    // get storage name
    const storageName = localStorage.getItem("test");
    // get storage data
    console.log("storageName", storageName);
    const storageData = JSON.parse(storageName || "");
    expect(storageData).toBeDefined();
    expect(storageData.count).toBe(1);
  });
});

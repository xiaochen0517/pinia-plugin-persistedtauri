import {PiniaPlugin, PiniaPluginContext, StateTree, Store, SubscriptionCallbackMutation} from "pinia";
import {defaultPersistedTauriOptions, getState, saveState} from "./storage";
import {DefineStoreOptionsPersist, PersistedTauriOptions} from "./types";
import _ from "lodash";

export function createPersistedState(): PiniaPlugin {
  return (context: PiniaPluginContext) => {
    console.log("context", context);
    const storeOptions: DefineStoreOptionsPersist = context.options.persist;
    const storeId: string = context.store.$id;
    // read state
    readStorageState(context.store, storeOptions, storeId);
    context.store.$subscribe((_mutation: SubscriptionCallbackMutation<StateTree>, state: StateTree) => {
      if (storeOptions !== undefined && storeOptions === false) {
        // persist is disabled
        return;
      }
      const parsedOptions: PersistedTauriOptions = getStorageOptions(storeOptions, storeId);
      // save state
      saveState(state, parsedOptions)
        .then(() => {
        })
        .catch((err) => {
          console.error("🚨pinia-plugin-persistedtauri error: save state error ->", err);
        });
    });
  };
}

const getStorageOptions = (storeOptions: DefineStoreOptionsPersist, storeId: string): PersistedTauriOptions => {
  let defaultOptions: PersistedTauriOptions = _.cloneDeep(defaultPersistedTauriOptions);
  defaultOptions.name = storeId;
  if (storeOptions !== undefined && typeof storeOptions !== "boolean") {
    // persist config is custom
    defaultOptions = {...defaultOptions, ...storeOptions};
  }
  return defaultOptions;
};

const readStorageState = (store: Store, storeOptions: DefineStoreOptionsPersist, storeId: string): void => {
  if (storeOptions !== undefined && storeOptions === false) {
    // persist is disabled
    return;
  }
  const parsedOptions: PersistedTauriOptions = getStorageOptions(storeOptions, storeId);
  getState(parsedOptions)
    .then((state) => {
      store.$patch(state as StateTree);
    })
    .catch((err) => {
      console.warn("🚨pinia-plugin-persistedtauri warning: get state error ->", err);
    });
};

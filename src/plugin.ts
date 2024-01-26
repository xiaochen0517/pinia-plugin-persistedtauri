import {PiniaPlugin, PiniaPluginContext, StateTree, Store, SubscriptionCallbackMutation} from "pinia";
import {defaultPersistedTauriOptions, getState, saveState} from "./storage";
import {DefineStoreOptionsPersist, PersistedTauriOptions} from "./types";
import _ from "lodash";

export function createPersistedState(): PiniaPlugin {
  return (context: PiniaPluginContext) => {
    console.log("context", context);
    const userOptions: DefineStoreOptionsPersist = context.options.persist;
    const storeId: string = context.store.$id;
    // read state
    readStorageState(context.store, userOptions, storeId);
    context.store.$subscribe((_mutation: SubscriptionCallbackMutation<StateTree>, state: StateTree) => {
      if (userOptions !== undefined && userOptions === false) {
        // persist is disabled
        return;
      }
      const parsedOptions: PersistedTauriOptions = getStorageOptions(userOptions, storeId);
      // save state
      saveState(state, parsedOptions, userOptions)
        .then(() => {
        })
        .catch((err) => {
          console.error("🚨pinia-plugin-persistedtauri error: save state error ->", err);
        });
    });
  };
}

const getStorageOptions = (userOptions: DefineStoreOptionsPersist, storeId: string): PersistedTauriOptions => {
  let storageOptions: PersistedTauriOptions = _.cloneDeep(defaultPersistedTauriOptions);
  storageOptions.name = storeId;
  if (userOptions !== undefined && typeof userOptions !== "boolean") {
    // persist config is custom
    storageOptions = {...storageOptions, ...userOptions};
  }
  return storageOptions;
};

const readStorageState = (store: Store, userOptions: DefineStoreOptionsPersist, storeId: string): void => {
  if (userOptions !== undefined && userOptions === false) {
    // persist is disabled
    return;
  }
  console.log("store id", storeId);
  const parsedOptions: PersistedTauriOptions = getStorageOptions(userOptions, storeId);
  console.log("parsed options", parsedOptions);
  getState(parsedOptions, userOptions)
    .then((state) => {
      store.$patch(JSON.parse(state));
    })
    .catch((err) => {
      console.warn("🚨pinia-plugin-persistedtauri warning: get state error ->", err);
    });
};

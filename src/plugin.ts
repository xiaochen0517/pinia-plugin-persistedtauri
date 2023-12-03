import {PiniaPlugin, PiniaPluginContext, StateTree} from "pinia";
import {defaultPersistedTauriOptions, saveState} from "./storage";
import {PersistedTauriOptions} from "./types";
import _ from "lodash";

export function createPersistedState(): PiniaPlugin {
  return (context: PiniaPluginContext) => {
    console.log('context', context);
    const persistOptions = context.options.persist;
    context.store.$subscribe((mutation, state: StateTree) => {
      console.log('mutation', mutation);
      console.log('state', state);
      if (persistOptions !== undefined && persistOptions === false) {
        // persist is disabled
        return;
      }
      let storageOptions: PersistedTauriOptions = _.cloneDeep(defaultPersistedTauriOptions);
      storageOptions.name = mutation.storeId;
      if (persistOptions === undefined || typeof persistOptions !== "boolean") {
        // persist config is custom
        storageOptions = {...storageOptions, ...persistOptions};
      }
      // save state
      saveState(state, storageOptions)
          .then(() => {
          })
          .catch((err) => {
            console.error("🚨pinia-plugin-persistedtauri error: ", err);
          });
    });
  }
}

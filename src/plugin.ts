import {PiniaPlugin, PiniaPluginContext, StateTree} from "pinia";
import {fs} from "@tauri-apps/api";

export function createPersistedState(): PiniaPlugin {
  return (context: PiniaPluginContext) => {
    console.log('context', context);
    context.store.$subscribe((mutation, state: StateTree) => {
      console.log('mutation', mutation);
      console.log('state', state);
      fs.writeFile({
        path: 'test.txt',
        contents: 'Hello World!'
      })
          .then(() => {
            console.log('The file has been written!');
          })
          .catch(error => {
            console.error("Error: ", error);
          })
    });
  }
}

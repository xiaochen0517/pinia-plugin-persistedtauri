import { PiniaPlugin, PiniaPluginContext } from "pinia";

export function createPersistedState(

): PiniaPlugin {
  return (context: PiniaPluginContext) => {
    console.log('context', context);
  }
}
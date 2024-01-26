import {StateSerializer} from "../types";

export class JsonSerializer implements StateSerializer {

  serialize(state: unknown): string {
    return JSON.stringify(state, null, 2);
  }

  deserialize(state: string): unknown {
    return JSON.parse(state);
  }
}

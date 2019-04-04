import { createContext } from "react";
import { LaunchDarkly } from "./client";

export interface FlagsContext {
  flagsClient?: LaunchDarkly;
}

const { Provider, Consumer } = createContext<FlagsContext>({
  flagsClient: undefined
});
export { Provider as FlagsProvider, Consumer as FlagsConsumer };

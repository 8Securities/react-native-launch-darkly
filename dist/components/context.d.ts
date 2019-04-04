/// <reference types="react" />
import { LaunchDarkly } from "./client";
export interface FlagsContext {
    flagsClient?: LaunchDarkly;
}
declare const Provider: import("react").ProviderExoticComponent<import("react").ProviderProps<FlagsContext>>, Consumer: import("react").ExoticComponent<import("react").ConsumerProps<FlagsContext>>;
export { Provider as FlagsProvider, Consumer as FlagsConsumer };

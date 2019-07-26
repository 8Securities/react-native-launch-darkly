import { LaunchDarkly } from "./components/client";
import { FlagsProvider, FlagsProviderProps, useFlagsClient } from "./components/FlagsProvider";
import { useBoolFlag } from "./components/useBoolFlag";
export interface ClientOptions {
    streaming?: boolean;
    baseUrl?: string;
    eventsUrl?: string;
}
export interface UserOptions {
    key?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    isAnonymous?: boolean;
}
export { LaunchDarkly, FlagsProvider, FlagsProviderProps, useFlagsClient, useBoolFlag };

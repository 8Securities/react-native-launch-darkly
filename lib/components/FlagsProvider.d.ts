import { ReactElement, ReactNode } from "react";
import { ClientOptions, UserOptions } from "..";
import { LaunchDarkly } from "./client";
export interface FlagsProviderProps {
    readonly children?: ReactNode;
    readonly client?: LaunchDarkly;
    readonly apiKey: string;
    options: ClientOptions;
    userOptions?: UserOptions;
}
export declare function FlagsProvider({ client, children, apiKey, options, userOptions }: FlagsProviderProps): ReactElement<FlagsProviderProps>;
export declare function useFlagsClient(): LaunchDarkly | null;

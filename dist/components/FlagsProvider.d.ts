import { ReactNode, ReactElement } from "react";
import { LaunchDarkly } from "./client";
import { ClientOptions, UserOptions } from "..";
export interface FlagsProviderProps {
    readonly children?: ReactNode;
    readonly client?: LaunchDarkly;
    readonly apiKey: string;
    options: ClientOptions;
    userOptions?: UserOptions;
}
export declare function FlagsProvider({ client, children, apiKey, options, userOptions }: FlagsProviderProps): ReactElement<FlagsProviderProps>;
export declare function useFlagsClient(): LaunchDarkly | null;

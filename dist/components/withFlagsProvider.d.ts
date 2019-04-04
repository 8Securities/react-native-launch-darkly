import { FlagsContext } from "./context";
import * as React from "react";
import { ClientOptions, UserOptions } from "..";
export interface ProviderConfig {
    env: string;
    options: ClientOptions;
    user?: UserOptions;
}
declare function withFlagsProvider(config: ProviderConfig): <P>(WrappedComponent: React.ComponentType<P>) => {
    new (props: P): {
        readonly state: Readonly<FlagsContext>;
        componentDidMount(): Promise<void>;
        render(): JSX.Element;
        context: any;
        setState<K extends "flagsClient">(state: FlagsContext | ((prevState: Readonly<FlagsContext>, props: Readonly<P>) => FlagsContext | Pick<FlagsContext, K> | null) | Pick<FlagsContext, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<P> & Readonly<{
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    contextType?: React.Context<any> | undefined;
};
export default withFlagsProvider;
